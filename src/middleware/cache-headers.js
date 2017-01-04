function setCacheHeaders(req, res, next) {

  res.set('cache-control', 'no-store');
  //no need to set Expires or anything else in the modern world.
  //https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching
  next();
};

module.exports = setCacheHeaders;