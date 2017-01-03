var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cacheHeader = require('./middleware/cache-headers');

var loadMiddlewares = {};

var customMiddlewares = [
  ''
];

loadMiddlewares.load = function(app) {
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json());

  // Cookie parser
  app.use(cookieParser());

  app.use(cacheHeader);

};
module.exports = loadMiddlewares;