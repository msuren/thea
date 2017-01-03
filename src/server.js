var config = require('./config/default.js');

var fs = require('fs');
var http = require('http');
var request = require('request');
var async = require('async');
var express = require('express');
var routes = require('./routes');
var _ = require('underscore');
var loadMiddlewares = require('./load-middlewares');

console.log(config);

var port = process.env.PORT || config.thea.port,
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

//TURBO BUTTON!!!!
http.globalAgent.maxSockets = 10000000;

thea.start = function startServer(ready) {
  console.info('starting server on port ' + port);
  // Load middlewares
  loadMiddlewares.load(app);

  // Load routes
  var r = request.defaults(requestOptions);
  routes(app, r);
  thea.httpServer = app.listen(port,  function () {
    console.log('Thea listening on port ' + port)
  });
};

thea.stop = function() {};

module.exports = thea;
