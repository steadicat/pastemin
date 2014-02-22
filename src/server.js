/** @jsx React.DOM */

var sys = require('sys');
var express = require('express');
var connect = require('connect');
var app = express();

app.use(express.logger());
app.use(express.json());
app.use(connect.favicon());
app.use(connect.errorHandler());

var routes = require('./routes');
routes.init(app);

app.use(function(err, req, res, next){
  sys.log(err.stack);
  res.send(500, '<pre>' + err.stack + '</pre>')
})

process.on('uncaughtException', function(e) {
  sys.log(e.stack)
})

// Only listen on $ node server.js
var port = parseInt(process.env.PORT, 10) || parseInt(process.argv[2], 10) || 5000
if (!module.parent) app.listen(port)
sys.log('Server now listening on port ' + port + '...')
