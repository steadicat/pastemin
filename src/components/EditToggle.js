/** @jsx React.DOM **/

var React = require('react');
var Icon = require('../components/Icon');

var EditToggle = React.createClass({

  getInitialState: function() {
    return {locked: false};
  },

  render: function() {
    return this.transferPropsTo(
      <a role="button" className="pointer" onClick={this.toggle}>
        <Icon
          icon={this.state.locked ? 'lock' : 'unlock'}
          className="ib mid"
        />
        <div className="ib mid mls">
          {this.state.locked ? 'Password needed to edit' : 'Anyone can edit' }
        </div>
      </a>
    );
  },

  toggle: function() {
    this.setState({locked: !this.state.locked});
  }

});

module.exports = EditToggle;
