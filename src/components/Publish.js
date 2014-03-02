/** @jsx React.DOM **/

var React = require('react');
var Button = require('./Button');
var Output = require('./Output');

var Publish = React.createClass({

  getInitialState: function() {
    return {
      publishing: false,
      progress: 0
    };
  },

  render: function() {
    var width = 270;
    if (this.props.published) {
      return this.transferPropsTo(
        <Output
          value={this.props.url}
          className="text-s"
          style={{width: width}}
        />
      );
    } else {
      return this.transferPropsTo(
        <Button
          style={{width: width}}
          loading={this.state.publishing}
          progress={this.state.progress}
          onClick={this.onPublish}
          icon='publish'>
          {this.state.publishing ? 'Publishing...' : (this.props.cdn ? 'Publish to CloudFront' : 'Publish to S3')}
        </Button>
      );
    }
  },

  componentDidUpdate: function(prevProps) {
    if (!prevProps.published && this.props.published) this.getDOMNode().select();
  },

  onPublish: function(event) {
    this.setState({
      publishing: true,
      progress: 0
    });
    this._interval = setInterval(this.updateProgress, 100);
    this.props.onPublish && this.props.onPublish();
  },

  updateProgress: function() {
    this.setState({progress: (this.state.progress * 0.99 + 0.01)});
  },

  componentWillUnmount: function() {
    clearInterval(this._interval);
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.published && !this.props.published) {
      this.setState({publishing: false, progress: 100});
    }
  }

});

module.exports = Publish;
