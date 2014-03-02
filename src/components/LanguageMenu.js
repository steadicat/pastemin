/** @jsx React.DOM **/

var React = require('react');
var Dropdown = require('./Dropdown');

var languages = {
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

var LanguageMenu = React.createClass({
  render: function() {
    return this.transferPropsTo(
      <Dropdown label="Language" options={languages} selected={this.props.language} />
    );
  }
});

module.exports = LanguageMenu;
