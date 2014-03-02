var Func = {};

Func.debounce = function(f, rate) {
  var timeout;
  return function() {
    if (timeout) clearTimeout(timeout);
    var self = this;
    var args = arguments;
    timeout = setTimeout(function() {
      f.apply(self, args);
      timeout = null;
    }, rate);
  };
};

module.exports = Func;