'use strict';


var config = require('config');
var fs = require('fs');
var logger = require('logger');
var proxyHost = config.api.gatewayApiHost;
var proxyPort = config.api.gatewayApiPort;

var ProxyServer = function() {};

ProxyServer.prototype.setup = function(app, r) {

  logger.info('Proxying to a real cluster :', proxyHost);

  // During development if your connection drops node crashes,
  // this prevents that by ignoring errors.
  var requestErrorHandler = function(error) {
    logger.error('Ignoring Error (' + error + ')');
  };

  // Define default Prism Gateway response handler.
  app.all(/PrismGateway\/(.*)|api\/nutanix\/v(.*)\/(.*)/, function(req, resp) {
    var payload;

    // Real Data
    //----------
    try {

      logger.debug(req.method);
      if (req.method === 'GET' || req.method === 'HEAD') {
        r.get('https://' + proxyHost + ':' + proxyPort + req.url, {
          headers: req.headers
        })
          .on('error', requestErrorHandler)
          .pipe(resp);
      } else if (req.method === 'POST') {
        payload = JSON.stringify(req.body);
        logger.debug(req.headers);
        r.post('https://' + proxyHost + ':' + proxyPort + req.url,
          {
            body: payload,
            headers: req.headers
          })
          .on('error', requestErrorHandler)
          .on('response', function(a,b) {
            //console.log(a);
            console.log(b);
          })
          .pipe(resp);
      } else if (req.method === 'PUT') {
        payload = JSON.stringify(req.body);
        r.put('https://' + proxyHost + ':' + proxyPort +
            req.url, {
              body: payload,
              headers: req.headers
            })
          .on('error', requestErrorHandler).pipe(resp);
      } else if (req.method === 'DELETE') {
        payload = JSON.stringify(req.body);
        r.del('https://' + proxyHost + ':' + proxyPort +
            req.url, {
              body: payload,
              headers: req.headers
            })
          .on('error', requestErrorHandler).pipe(resp);
      }
    } catch (e) {
      logger.error("ERROR Proxying Request:", e);
    }
  });
};


module.exports = new ProxyServer();
