var _ = require('highland');
var sys = require('sys');
var uglifyJs = require('uglify-js');
var zlib = require('zlib');

var React = require('react');
var Asset = require('./asset');
var Home = require('./pages/home');

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

var gzip = _.wrapCallback(zlib.gzip);

var languages = {
  js: {
    language: 'javascript',
    type: 'text/javascript',
    process: function(x) { return x; }
  },
  css: {
    language: 'css',
    type: 'text/css',
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
          published: asset && (asset.published === 'true')
        });
      });
    });

    app.put(/\/([a-z0-9]+)/, function(req, res) {
      var id = req.params[0];
      var asset = {
        published: false
      };
      (req.body.language !== undefined) && (asset.language = req.body.language);
      (req.body.content !== undefined) && (asset.content = req.body.content);
      (req.body.cdn !== undefined) && (asset.cdn = req.body.cdn);
      Asset.write(id, asset, function(err, cb) {
        asset.id = id;
        res.send(200, asset);
      });
    });

  }
};
