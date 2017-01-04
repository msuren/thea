'use strict';

var config = require('config');
var logger = require('logger');

var WebSockets = function() {};

WebSockets.prototype.setup = function(app, r) {

  require('express-ws')(app);
  logger.info('setup the web sockets');

  app.ws('/', function(ws, req) {
    ws.on('message', function(msg) {
      console.log(msg);
    });
    console.log('socket', req.testing);
  });
};


module.exports = new WebSockets();
