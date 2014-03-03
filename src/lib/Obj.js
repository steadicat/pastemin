var Obj = {};

Obj.merge = function() {
  var sources = Array.prototype.slice.apply(arguments);
  var res = {};
  for (var i = 0, l = sources.length; i < l; i++) {
    for (var prop in sources[i]) {
      if (sources[i].hasOwnProperty(prop) && (res[prop] === undefined)) {
        res[prop] = sources[i][prop];
      }
    }
  }
  return res;
};

Obj.keys = function(obj) {
  var ks = [];
  for (var k in obj) ks.push(k);
  return ks;
};

Obj.values = function(obj) {
  var ks = [];
  for (var k in obj) ks.push(obj[k]);
  return ks;
};

module.exports = Obj;