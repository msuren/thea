'use strict';


var config = require('../config/default.js');
var fs = require('fs');
var proxyHost = config.api.gatewayApiHost;
var proxyPort = config.api.gatewayApiPort;

var ProxyServer = function() {};

ProxyServer.prototype.setup = function(app, r) {

  console.log('Proxying to a real cluster :', proxyHost);

  // During development if your connection drops node crashes,
  // this prevents that by ignoring errors.
  var requestErrorHandler = function(error) {
    console.log('Ignoring Error (' + error + ')');
  };

  // Define default Prism Gateway response handler.
  app.all(/PrismGateway\/(.*)|api\/nutanix\/v(.*)\/(.*)/, function(req, resp) {
    var payload;

    // Real Data
    //----------
    try {

      console.log(req.method);
      if (req.method === 'GET' || req.method === 'HEAD') {
        r.get('https://' + proxyHost + ':' + proxyPort + req.url)
          .on('error', requestErrorHandler)
          .pipe(resp);
      } else if (req.method === 'POST') {
        payload = JSON.stringify(req.body);
        r.post('https://' + proxyHost + ':' + proxyPort + req.url,
          {
            'body': payload
          })
          .on('error', requestErrorHandler)
          .pipe(resp);
      } else if (req.method === 'PUT') {
        payload = JSON.stringify(req.body);
        r.put('https://' + proxyHost + ':' + proxyPort +
            req.url, {
              'body': payload
            })
          .on('error', requestErrorHandler).pipe(resp);
      } else if (req.method === 'DELETE') {
        payload = JSON.stringify(req.body);
        r.del('https://' + proxyHost + ':' + proxyPort +
            req.url, {
              'body': payload
            })
          .on('error', requestErrorHandler).pipe(resp);
      }
    } catch (e) {
      console.log("ERROR Proxying Request:", e);
    }
  });
};


module.exports = new ProxyServer();
