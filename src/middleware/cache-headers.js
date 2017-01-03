
/**
 * We set no-store headers at the overall boreas level here.
 * CDN configured to cache static assets properly regardless of cache headers
 * from server so OK to do this for all responses, including assets.
 */
function setCacheHeaders(req, res, next) {
  //console.log('set cache headers');
  //console.log(req);
  res.set('cache-control', 'no-store');
  //no need to set Expires or anything else in the modern world.
  //https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching
  next();
};

module.exports = setCacheHeaders;