'use strict';


var config = require('../config/default.js');
var fs = require('fs');
var path = require('path');
var appDir = path.dirname(require.main.filename);
var proxyHost = config.api.gatewayApiHost;
var proxyPort = config.api.gatewayApiPort;

var StaticResources = function() {};

StaticResources.prototype.setup = function(app, r) {

  console.log('setup the static assets file');
  app.get(/assets/, function(req, resp) {
    console.log('read asset file');
    resp.sendfile(appDir + '/assets' + req.path);
  });

  app.get(/index.html/, function(req, resp) {
    console.log('read index.html file ' + appDir +req.path);
    resp.sendfile(appDir + '/index.html');
  });
};


module.exports = new StaticResources();
