/** @jsx React.DOM **/

var React = require('react');
var Button = require('../components/Button');

var EditToggle = React.createClass({

  getInitialState: function() {
    return {locked: false};
  },

  render: function() {
    return this.transferPropsTo(
      <Button onClick={this.toggle} color="gray" icon={this.state.locked ? 'lock' : 'unlock'}>
        {this.state.locked ? 'Password needed to edit' : 'Anyone can edit' }
      </Button>
    );
  },

  toggle: function() {
    this.setState({locked: !this.state.locked});
  }

});

module.exports = EditToggle;
