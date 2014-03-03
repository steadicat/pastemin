var sys = require('sys');
var AwsInfo = require('./lib/AwsInfo');
var Languages = require('./lib/Languages');
var Random = require('./lib/Random');
var Obj = require('./lib/Obj');

var redis = require('redis').createClient();
var s3 = require('knox').createClient(AwsInfo);

var Asset = {};

/*
function uglify(src) {
  try {
    var code = uglifyJs.minify(src, {
      fromString: true,
      output: {}
    }).code;
    return code;
  } catch(e) {
    sys.log(e.stack);
    return src;
  }
}

var gzip = _.wrapCallback(zlib.gzip);

var processing = {
  javascript: function(x) { return x; },
  css: uglify
};
*/

function key(id) {
  return 'asset:' + id;
}

function toJSON(obj) {
  var res = {};
  for (var key in obj) {
    res[key] = JSON.stringify(obj[key]);
  }
  return res;
}

function fromJSON(obj) {
  var res = {};
  for (var key in obj) {
    res[key] = JSON.parse(obj[key]);
  }
  return res;
}

function filter(obj, defaults) {
  var res = {};
  for (var key in obj) {
    if (defaults[key] !== undefined) {
      res[key] = obj[key];
    }
  }
  return res;
}

var defaults = {
  language: 'css',
  content: '/* Type the code of your asset here. */\n\n',
  cdn: false,
  published: false,
  url: null
};

Asset.get = function(id, cb) {
  redis.hgetall(key(id), function(err, asset) {
    if (err) return cb(err);
    if (!asset) return cb(null, null);
    cb(null, Obj.merge(fromJSON(asset), defaults, {id: id}));
  });
};

Asset.getWithUpdates = function(id, updates, cb) {
  Asset.get(id, function(err, asset) {
    if (err) return cb(err);
    cb(null, Obj.merge(updates, asset));
  });
};

Asset.getOrCreate = function(id, cb) {
  if (!id) return cb(null, Obj.merge({}, defaults, {id: Random.getID()}));
  Asset.get(id, function(err, asset) {
    if (err) return cb(err);
    if (asset === null) cb(null, Obj.merge({}, defaults, {id: id}));
    cb(null, asset);
  });
};

Asset.write = function(id, data, cb) {
  console.log(toJSON(filter(data, defaults)));
  redis.hmset(key(id), toJSON(filter(data, defaults)), function(err) {
    if (err) return cb(err);
    console.log(err);
    Asset.get(id, cb);
  });
};

Asset.publish = function(asset, callback) {
  var salt = asset.cdn ? ('.' + Random.getID()) : '';
  var path = '/' + asset.id + salt + '.' + Languages.getOutputExtension(asset.language);
  var req = s3.put(path, {
    'Content-Length': asset.content.length,
    'Content-Type': Languages.getOutputType(asset.language),
    'x-amz-acl': 'public-read'
  });
  req.on('response', function(res){
    if (res.statusCode == 200) {
      sys.log('Saved to ' + req.url);
      sys.log(JSON.stringify(asset));
      if (asset.cdn) {
        callback(null, req.url.replace(AwsInfo.bucket + '.s3.amazonaws.com', AwsInfo.cloudfront));
      } else {
        callback(null, req.url);
      }
    } else {
      sys.warn(res);
      callback(res);
    }
  });
  req.end(asset.content);
};

module.exports = Asset;
