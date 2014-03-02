/** @jsx React.DOM **/

var React = require('react');

var Output = React.createClass({

  render: function() {
    return this.transferPropsTo(
      <input
        type="text"
        readOnly="true"
        className="input ib border-box"
        value={this.props.value}
        onClick={this.onClick}
      />
    );
  },

  onClick: function(event) {
    event.target.select();
  },

});

module.exports = Output;