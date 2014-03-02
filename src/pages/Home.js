/** @jsx React.DOM **/

var React = require('react');
var SuperAgent = require('superagent');
var Button = require('../components/Button');
var Page = require('../components/Page');
var Editor = require('../components/Editor');
var Header = require('../components/Header');
var Toolbar = require('../components/Toolbar');
var Random = require('../lib/Random');
var Func = require('../lib/Func');

var HEADER = 174;
var TOOLBAR = 45;

var Home = React.createClass({

  getInitialState: function() {
    return {
      id: this.props.id,
      language: this.props.language || 'javascript',
      cdn: this.props.cdn,
      changed: !this.props.published,
      publishedUrl: this.props.publishedUrl
    };
  },

  render: function() {
    return (
      <Page title="Pastemin: asset editor and host" props={this.props}>
        <div className="fixed fill top-left" style={{paddingTop: HEADER + TOOLBAR}}>
          <Editor
            language={this.state.language}
            text={this.props.content}
            onChange={this.onChange}
          />
        </div>
        <Toolbar
          id={this.state.id}
          language={this.state.language}
          cdn={this.state.cdn}
          onCdnToggle={this.onCdnToggle}
          published={!this.state.changed}
          publishedUrl={this.state.publishedUrl}
          onLanguageChange={this.onLanguageChange}
          onPublish={this.onPublish}
          className="phl abs full-width border-box"
          style={{top: HEADER}}
        />
        <Header className="fixed full-width top-left z1" headerHeight={HEADER} />
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

  onChange: Func.debounce(function(content) {
    this.setState({changed: true});
    this.save({content: content});
  }, 2000),

  onPublish: function() {
    this.save({published: true});
  },

  save: function(data) {
    SuperAgent
      .put('/' + this.state.id)
      .set('Accept', 'application/json')
      .send(data).end(function(res) {
        this.setState({
          changed: !res.body.published,
          publishedUrl: res.body.url
        });
      }.bind(this));
  },

  componentDidMount: function() {
    if (!this.state.id) {
      this.setState({id: Random.getID()});
      history.replaceState(null, null, '/' + this.state.id);
    }
  }

});

if (typeof document !== 'undefined') {
  React.renderComponent(Home(props), document);
}

module.exports = Home;
