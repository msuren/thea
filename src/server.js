var config = require('./config/default.js');

var fs = require('fs');
var http = require('http');
var https = require('https');
var request = require('request');
var async = require('async');
var express = require('express');
var routes = require('./routes');
var _ = require('underscore');
var loadMiddlewares = require('./load-middlewares');

console.log(config);

var httpPort = process.env.PORT || config.thea.httpPort,
    httpsPort = process.env.HTTPS_PORT || config.thea.httpsPort,
    app = express();

var thea = {
  app: app
};

// Set up options for the request handler.
var requestOptions = {
  'strictSSL': false,
  'headers': {
    'Authorization': 'Basic '
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

  // Load routes
  var r = request.defaults(requestOptions);
  routes(app, r);

  // Create server
  thea.httpServer  = http.createServer(app);
  thea.httpsServer = https.createServer(credentials, app);

  // Listen now.
  thea.httpServer.listen(httpPort,  function () {
    console.log('Thea listening on http port ' + httpPort)
  });
  thea.httpsServer.listen(httpsPort,  function () {
    console.log('Thea listening on https port ' + httpsPort)
  });
};

thea.stop = function() {};

module.exports = thea;
