var Languages = {};

Languages.byGroup = {
  Standard: {
    css: 'CSS',
    javascript: 'JavaScript'
  },
  CSS: {
    css: 'CSS',
    sass: 'SASS',
    scss: 'SCSS',
    less: 'LESS',
    stylus: 'Stylus'
  },
  JavaScript: {
    javascript: 'JavaScript',
    coffeescript: 'CoffeeScript',
    jsx: 'JSX'
  }
};

var groupExtensions = {
  CSS: 'css',
  JavaScript: 'js'
};

var extensions = {};

for (var group in Languages.byGroup) {
  for (var id in Languages.byGroup[group]) {
    extensions[id] = groupExtensions[group];
  }
}

Languages.getExtension = function(id) {
  return extensions[id];
};

module.exports = Languages;