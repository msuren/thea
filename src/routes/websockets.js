'use strict';

var config = require('config');
var logger = require('logger');
var url = require('url');

var WebSockets = function() {};

WebSockets.prototype.setup = function(app, r, wss) {

  wss.on('connection', function connection(ws) {
    var location = url.parse(ws.upgradeReq.url, true);
    console.log(location);

    ws.on('message', function incoming(message) {
      console.log('received: %s', message);
    });

    ws.send('something');
  });
};


module.exports = new WebSockets();
