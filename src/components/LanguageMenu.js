/** @jsx React.DOM **/

var React = require('react');
var Dropdown = require('./Dropdown');
var Languages = require('../lib/Languages');

var LanguageMenu = React.createClass({
  render: function() {
    return this.transferPropsTo(
      <Dropdown label="Language" options={Languages.byGroup} selected={this.props.language} />
    );
  }
});

module.exports = LanguageMenu;
