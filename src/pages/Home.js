/** @jsx React.DOM **/

var React = require('react');
var SuperAgent = require('superagent');
var Button = require('../components/Button');
var Page = require('../components/Page');
var Editor = require('../components/Editor');
var Toolbar = require('../components/Toolbar');

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
             .toString(16)
             .substring(1);
};

function guid() {
  return s4() + s4() + s4();
}

function debounce(f, rate) {
  var timeout;
  return function() {
    if (timeout) clearTimeout(timeout);
    var self = this;
    var args = arguments;
    timeout = setTimeout(function() {
      f.apply(self, args);
      timeout = null;
    }, rate);
  };
}

var Home = React.createClass({

  getInitialState: function() {
    return {
      id: this.props.id,
      language: this.props.language || 'javascript',
      cdn: this.props.cdn,
      changed: !this.props.published
    };
  },

  render: function() {
    return (
      <Page title="Pastemin: asset editor and host" props={this.props}>
        <div className="pvm phh">
          <h1 className="b ib text-l">Pastemin</h1>
          <h2 className="ib text-l">: instant assets</h2>
          <a className="text-s purple mlm pointer">Read more</a>
          <Button
            icon="new"
            color="green"
            className="mam ib bottom abs top-right"
            href="/">
            New
          </Button>
        </div>
        <Toolbar
          id={this.state.id}
          language={this.state.language}
          cdn={this.state.cdn}
          onCdnToggle={this.onCdnToggle}
          published={!this.state.changed}
          onLanguageChange={this.onLanguageChange}
          onPublish={this.onPublish}
          className="phh mbl"
        />
        <Editor
          language={this.state.language}
          text={this.props.content}
          onChange={this.onChange}
        />
      </Page>
    );
  },

  onLanguageChange: function(language) {
    this.setState({language: language});
    this.save({language: language});
  },

  onCdnToggle: function(cdn) {
    this.setState({cdn: cdn});
    this.save({cdn: cdn});
  },

  onChange: debounce(function(content) {
    this.setState({changed: true});
    this.save({content: content});
  }, 2000),

  onPublish: function() {
    this.setState({changed: false});
    this.save({published: true});
  },

  save: function(data) {
    SuperAgent
      .put('/' + this.state.id)
      .set('Accept', 'application/json')
      .send(data).end(function(res) {
        console.log(res.body);
        this.setState({published: res.body.published});
      }.bind(this));
  },

  componentDidMount: function() {
    if (!this.state.id) {
      this.setState({id: guid()});
      history.replaceState(null, null, '/' + this.state.id);
    }
  }

});

if (typeof document !== 'undefined') {
  React.renderComponent(Home(props), document);
}

module.exports = Home;
