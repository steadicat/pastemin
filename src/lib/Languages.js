var Languages = {};

var languages = {
  css: { id: 'css', name: 'CSS', syntax: 'css', output: 'css', categories: ['Standard', 'CSS'] },
  js: { id: 'js', name: 'JavaScript', syntax: 'javascript', output: 'js', categories: ['Standard', 'JavaScript'] },
  sass: { id: 'sass', name: 'SASS', syntax: 'sass', output: 'css', categories: ['CSS'] },
  scss: { id: 'scss', name: 'SCSS', syntax: 'scss', output: 'css', categories: ['CSS'] },
  less: { id: 'less', name: 'LESS', syntax: 'less', output: 'css', categories: ['CSS'] },
  styl: { id: 'styl', name: 'Stylus', syntax: 'stylus', output: 'css', categories: ['CSS'] },
  coffee: { id: 'coffee', name: 'CoffeeScript', syntax: 'coffeescript', output: 'js', categories: ['JavaScript'] },
  jsx: { id: 'jsx', name: 'JSX', syntax: 'jsx', output: 'js', categories: ['JavaScript'] },
};

var outputs = {
  css: { id: 'css', type: 'text/css' },
  js: { id: 'js', type: 'text/javascript' },
};

function push(object, key, val) {
  object[key] || (object[key] = []);
  object[key].push(val);
}

Languages.byGroup = function() {
  var groups = {};
  for (var id in languages) {
    for (var i = 0, l = languages[id].categories.length; i < l; i++) {
      push(groups, languages[id].categories[i], languages[id]);
    }
  }
  return groups;
};

Languages.byID = function() {
  return languages;
};

Languages.getOutputType = function(id) {
  return outputs[languages[id].output].type;
};

Languages.getOutputExtension = function(id) {
  return outputs[languages[id].output].id;
};

Languages.getSyntax = function(id) {
  return languages[id].syntax;
};

module.exports = Languages;
