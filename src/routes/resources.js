'use strict';


var config = require('config');
var fs = require('fs');
var path = require('path');
var appDir = path.dirname(require.main.filename);
var logger = require('logger');

var StaticResources = function() {};

StaticResources.prototype.setup = function(app, r) {

  logger.info('setup the static assets file');
  app.get(/app/, function(req, resp) {
    logger.info('read asset file');
    resp.sendfile(appDir + req.path);
  });

  app.get(/index.html/, function(req, resp) {
    logger.info('read index.html file ' + appDir +req.path);
    resp.sendfile(appDir + '/index.html');
  });
};


module.exports = new StaticResources();
