/** @jsx React.DOM **/

var React = require('react');
var Button = require('./Button');

var Publish = React.createClass({

  getInitialState: function() {
    return {
      publishing: false,
      progress: 0
    };
  },

  render: function() {
    var width = 260;
    if (this.props.published) {
      return this.transferPropsTo(
        <input
          type="text"
          readOnly="true"
          value={this.props.url}
          className="input ib bottom"
          style={{width: width}}
          onClick={this.onUrlClick}
        />
      );
    } else {
      return this.transferPropsTo(
        <Button
          style={{width: width}}
          fill={true}
          loading={this.state.publishing}
          progress={this.state.progress}
          onClick={this.onPublish}
          icon='publish'>
          {this.state.publishing ? 'Publishing...' : (this.props.cdn ? 'Publish to CloudFront' : 'Publish to S3')}
        </Button>
      );
    }
  },

  onUrlClick: function(event) {
    event.target.select();
  },

  onPublish: function(event) {
    this.setState({
      publishing: true,
      progress: 0
    });
    this._interval = setInterval(this.updateProgress, 100);
  },

  updateProgress: function() {
    this.setState({progress: (this.state.progress * 0.99 + 0.01)});
  },

  componentWillUnmount: function() {
    clearInterval(this._interval);
  },

});

module.exports = Publish;
