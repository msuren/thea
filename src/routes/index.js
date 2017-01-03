var exports = {};
require('fs').readdirSync(__dirname + '/').forEach(function(file) {
  if (file.match(/\.js$/) !== null && file !== 'index.js') {
    var name = file.replace('.js', '');
    console.log('loading routes from ' + file);
    exports[name] = require('./' + file);
  }
});

module.exports = function(app, r) {
  console.log('setting up the routes');
  console.log(exports);
  for(var key in exports) {
    exports[key].setup(app, r);
  }
};