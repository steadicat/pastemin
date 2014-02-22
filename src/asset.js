var sys = require('sys');
var redis = require('redis').createClient();

var Asset = {};

function key(id) {
  return 'asset:' + id;
}

Asset.get = function(id, cb) {
  redis.hgetall(key(id), cb);
};

Asset.write = function(id, data, cb) {
  redis.hmset(key(id), data, cb);
};

module.exports = Asset;
