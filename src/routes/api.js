'use strict';

var config = require('config');
var logger = require('logger');
var async = require('async');
var url = require('url');

var AccountsApi = function() {};


AccountsApi.prototype.setup = function(app, r) {

  logger.info('setup the static assets file');
  app.get('/api/accounts', function(req, resp) {

    async.parallel([
      function(callback) {
        callback(null, {'a' : 'b'});
      },
      function(callback) {
        callback(null, {'c' : 'd'});
      }
    ], function(err, results) {
      if(err) {
        res.status(500).send('Something broke!')
      }
      resp.json(results);
    });
  });

};


module.exports = new AccountsApi();
