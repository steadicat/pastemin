/** @jsx React.DOM **/

var React = require('react');
var Button = require('./Button');

var CdnToggle = React.createClass({

  render: function() {
    return this.transferPropsTo(
      <Button
        icon={this.props.cdn ? 'cloud' : 'cloudOff'}
        color="gray"
        fill={this.props.cdn}
        onClick={this.onClick}>
        {this.props.cdn ? 'Using CloudFront' : 'Not using CloudFront'}
      </Button>
    )
  },

  onClick: function() {
    this.props.onCdnToggle && this.props.onCdnToggle(!this.props.cdn);
  },

});

module.exports = CdnToggle;
