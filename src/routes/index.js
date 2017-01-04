var exports = {};
require('fs').readdirSync(__dirname + '/').forEach(function(file) {
  if (file.match(/\.js$/) !== null && file !== 'index.js') {
    var name = file.replace('.js', '');
    exports[name] = require('./' + file);
  }
});

module.exports = function(app, r, wss) {
  for(var key in exports) {
    exports[key].setup(app, r, wss);
  }
};