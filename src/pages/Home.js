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
      language: this.props.language || 'css',
      cdn: this.props.cdn,
      changed: !this.props.published,
      publishedUrl: this.props.url
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
          aborted={this.state.aborted}
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
    this.setState({changed: true, aborted: false});
    this.save({content: content});
  }, 2000),

  onPublish: function() {
    this.save({published: true});
  },

  save: function(data) {
    SuperAgent
      .put('/' + this.state.id)
      .set('Accept', 'application/json')
      .send(data)
      .timeout(5000)
      .on('error', function(err) {
        console.warn(err);
        this.setState({
          aborted: true
        });
      }.bind(this)).end(function(res) {
        this.setState({
          changed: !res.body.published,
          publishedUrl: res.body.url,
          aborted: false
        });
      }.bind(this));
  },

  componentDidMount: function() {
    var id = this.state.id || Random.getID();
    this.setState({id: id});
    history.replaceState(null, null, '/' + id);
  }

});

if (typeof document !== 'undefined') {
  React.renderComponent(Home(props), document);
}

module.exports = Home;
