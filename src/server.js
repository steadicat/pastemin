/** @jsx React.DOM */

var sys = require('sys');
var express = require('express');
var connect = require('connect');
var connectDomain = require('connect-domain');
var app = express();

app.use(connectDomain());
app.use(connect.logger());
app.use(connect.json());
app.use(connect.favicon());

var routes = require('./routes');
app = routes.init(app);

app.use(function(err, req, res, next) {
  sys.log('ERROR ' + err.stack);
  res.send(500, '<pre>' + err.stack + '</pre>')
});

process.on('uncaughtException', function(err) {
  sys.log('FATAL ' + err.stack);
});

// Only listen on $ node server.js
var port = parseInt(process.env.PORT, 10) || parseInt(process.argv[2], 10) || 5000;
if (!module.parent) app.listen(port);
sys.log('Server now listening on port ' + port + '...');
