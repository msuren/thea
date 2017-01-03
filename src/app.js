var server = require('./server');

server.start(null, function(err, boreas) {
  if (err) {
    console.error('Problem starting server', err);
    boreas.stop();
  }
  console.info('Server listening');
});
