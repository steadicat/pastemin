var _ = require('highland');
var sys = require('sys');
var uglifyJs = require('uglify-js');
var zlib = require('zlib');
var knox = require('knox');

var React = require('react');
var Asset = require('./asset');
var Home = require('./pages/home');
var AwsInfo = require('./lib/AwsInfo');
var Random = require('./lib/Random');

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
};

var client = knox.createClient(AwsInfo);

function publish(asset, callback) {
  var lang = languages[asset.language];
  var salt = asset.cdn ? ('.' + Random.getID()) : '';
  var req = client.put('/' + asset.id + salt + '.' + lang.extension, {
      'Content-Length': asset.content.length,
      'Content-Type': lang.type,
      'x-amz-acl': 'public-read'
  });
  req.on('response', function(res){
    if (res.statusCode == 200) {
      console.log('Saved to %s', req.url);
      console.log(JSON.stringify(asset));
      if (asset.cdn) {
        callback(null, req.url.replace(AwsInfo.bucket + '.s3.amazonaws.com', AwsInfo.cloudfront));
      } else {
        callback(null, req.url);
      }
    } else {
      console.warn(res);
      callback(res);
    }
  });
  req.end(asset.content);
}

var gzip = _.wrapCallback(zlib.gzip);

var languages = {
  javascript: {
    language: 'javascript',
    type: 'text/javascript',
    extension: 'js',
    process: function(x) { return x; }
  },
  css: {
    language: 'css',
    type: 'text/css',
    extension: 'css',
    process: uglify
  }
};


module.exports = {
  init: function(app) {

    app.get(/\/js\/pages\/(.*)\.js/, function(req, res) {
      res.set({'Content-Type': 'text/javascript', 'Content-Encoding': 'gzip'});
      res.sendfile('dist/assets' + req.path + '.gz');
    });

    app.get(/\/js\/vendor\/(.*)\.js/, function(req, res) {
      res.set({'Content-Type': 'text/javascript'});
      res.sendfile('dist/assets/js/vendor/' + req.params[0] + '.js');
    });

    app.get(/\/css\/(.*)\.css/, function(req, res) {
      res.set({'Content-Type': 'text/css', 'Content-Encoding': 'gzip'});
      res.sendfile('dist/assets/css/' + req.params[0] + '.css.gz');
    });

    function getAssetIfNeeded(id, callback) {
      if (!id) return callback(null);
      Asset.get(id, callback);
    }

    function respond(req, res, code, json, component, props) {
      res.format({
        json: res.send.bind(res, code, json),
        html: function() {
          res.send(200, React.renderComponentToString(component(props)));
        }
      });
    }

    function error(res, err) {
      sys.log(err.stack);
      res.send(500, '<pre>' + err.stack + '</pre>')
    }

    function notFound(res) {
      res.send(404, '<pre>Not found.</pre>');
    }

    app.get(/\/([a-z0-9]*)\.([a-z]+)/, function(req, res) {
      Asset.get(req.params[0], function(err, asset) {
        if (err) return error(res, err);
        var ext = req.params[1];
        if (asset.language !== languages[ext].language) return notFound(res);
        res.set({'Content-Type': languages[ext].mime});
        _([asset.content]).map(languages[ext].process).pipe(res);
      });
    });

    app.get(/\/([a-z0-9]*)/, function(req, res) {
      var id = req.params[0];
      getAssetIfNeeded(id, function(err, asset) {
        if (err) return error(res, err);
        respond(req, res, 200, asset, Home, {
          id: id,
          language: (asset && asset.language) || undefined,
          content: (asset && asset.content) || undefined,
          cdn: asset && (asset.cdn === 'true'),
          published: asset && (asset.published === 'true'),
          publishedUrl: (asset && asset.url) || undefined
        });
      });
    });

    app.put(/\/([a-z0-9]+)/, function(req, res) {
      var id = req.params[0];
      var asset = {};
      (req.body.language !== undefined) && (asset.language = req.body.language);
      (req.body.content !== undefined) && (asset.content = req.body.content);
      (req.body.cdn !== undefined) && (asset.cdn = req.body.cdn);

      if (req.body.published) {
        Asset.get(id, function(err, savedAsset) {
          if (err) return error(res, err);
          if (savedAsset) {
            asset.language || (asset.language = savedAsset.language);
            asset.content || (asset.content = savedAsset.content);
            asset.cdn || (asset.cdn = (savedAsset.cdn == 'true'));
          }
          asset.id = id;

          publish(asset, function(err, url) {
            if (err) return error(res, err);
            if (url) {
              asset.published = true;
              asset.url = url;
            }
            delete asset.id;
            Asset.write(id, asset, function(err, cb) {
              asset.id = id;
              res.send(200, asset);
            });
          });
        });
      } else {
        asset.published = false;
        Asset.write(id, asset, function(err, cb) {
          asset.id = id;
          res.send(200, asset);
        });
      }
    });

  }
};
