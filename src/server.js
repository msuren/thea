var config = require('config');

var fs = require('fs');
var http = require('http');
var https = require('https');
var request = require('request');
var async = require('async');
var express = require('express');
var routes = require('./routes');
var WebSocketServer = require('ws').Server;
var logger = require('logger');
var _ = require('underscore');
var loadMiddlewares = require('./load-middlewares');

var httpPort = process.env.PORT || config.httpPort,
    httpsPort = process.env.HTTPS_PORT || config.httpsPort,
    app = express();

var thea = {
  app: app
};

var base64UsernamePass =
    new Buffer('admin:nutanix/4u').toString('base64');

// Set up options for the request handler.
var requestOptions = {
  'strictSSL': false,
  'headers': {
    'Authorization': 'Basic ' + base64UsernamePass
  }
};


var credentials = {
  key: fs.readFileSync('sslcert/server.key'),
  cert: fs.readFileSync('sslcert/server.crt'),
  ca: fs.readFileSync('sslcert/ca.crt'),
  requestCert: true,
  rejectUnauthorized: false
};

//TURBO BUTTON!!!!
http.globalAgent.maxSockets = 10000000;

thea.start = function startServer(ready) {
  // Load middlewares
  loadMiddlewares.load(app);

  // Create server
  thea.httpServer  = http.createServer(app);
  thea.httpsServer = https.createServer(credentials, app);

  var wss = new WebSocketServer({ server: thea.httpServer });

  // Load routes
  var r = request.defaults(requestOptions);
  routes(app, r, wss);

  // Listen now.
  thea.httpServer.listen(httpPort,  function () {
    logger.info('Thea listening on http port ' + httpPort)
  });
  thea.httpsServer.listen(httpsPort,  function () {
    logger.info('Thea listening on https port ' + httpsPort)
  });
};

thea.stop = function() {};

module.exports = thea;
