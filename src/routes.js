var _ = require('highland');
var sys = require('sys');

var React = require('react');
var Asset = require('./asset');
var Home = require('./pages/home');

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

    function respond(req, res, code, json, component, props) {
      console.log(code);
      res.format({
        html: function() {
          res.send(200, React.renderComponentToString(component(props)));
        },
        json: function() {
          res.send(200, json);
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

    /*
    app.get(/\/([a-z0-9]*)\.([a-z]+)/, function(req, res) {
      Asset.get(req.params[0], function(err, asset) {
        if (err) return error(res, err);
        var ext = req.params[1];
        if (asset.language !== languages[ext].language) return notFound(res);
        res.set({'Content-Type': languages[ext].mime});
        _([asset.content]).map(languages[ext].process).pipe(res);
      });
    });
    */

    app.get(/^\/([a-z0-9]{12})?$/, function(req, res) {
      Asset.getOrCreate(req.params[0], function(err, asset) {
        if (err) return error(res, err);
        if (!asset) return notFound(res);
        respond(req, res, 200, asset, Home, asset);
      });
    });

    app.put(/^\/([a-z0-9]{12})$/, function(req, res) {
      var id = req.params[0];
      if (req.body.published) {
        delete req.body.published;
        Asset.getWithUpdates(id, req.body, function(err, asset) {
          if (err) return error(res, err);
          Asset.publish(asset, function(err, url) {
            if (err) return error(res, err);
            if (url) {
              asset.published = true;
              asset.url = url;
            }
            Asset.write(id, asset, function(err, asset) {
              if (err) return error(res, err);
              res.send(200, asset);
            });
          });
        });
      } else {
        var asset = req.body;
        asset.published = false;
        Asset.write(id, asset, function(err, asset) {
          if (err) return error(res, err);
          res.send(200, asset);
        });
      }
    });

    return app;

  }
};
