var getPosition = require('geo-position');

module.exports = function(options) {
  if (!options) options = {}
  return init.bind(null, options);
}

function init(options, ractive, read) {

  var frequency = options.frequency || (60 * 1000);


  var finder = function(){
    getPosition(function (err, pos) {
      if (err) return;
      ractive.fire('log', 'position', pos)
    });
  }

  var interval = setInterval(finder, frequency);

  ractive.on('submitted', function(){
    clearInterval(interval);
  })

  finder();
}
