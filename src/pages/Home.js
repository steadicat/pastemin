/** @jsx React.DOM **/

var React = require('react');
var SuperAgent = require('superagent');
var Page = require('../components/Page');
var Editor = require('../components/Editor');
var Toolbar = require('../components/Toolbar');

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
             .toString(16)
             .substring(1);
};

function guid() {
  return s4() + s4() + s4() + s4();
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
      language: 'javascript',
      id: this.props.id
    };
  },

  render: function() {
    return (
      <Page title="Pastemin - asset editor and host" props={this.props}>
        <div className="pbm">
          <h1 className="b ib">Pastemin</h1>
          <h2 className="ib">&nbsp;a host for your assets</h2>
        </div>
        <Toolbar id={this.state.id} language={this.state.language} onLanguageChange={this.onLanguageChange} />
        <Editor language={this.state.language} text={this.props.content} onChange={this.onChange} />
      </Page>
    );
  },

  onLanguageChange: function(language) {
    this.setState({language: language});
  },

  onChange: debounce(function(content) {
    SuperAgent
      .put('/' + this.state.id)
      .set('Accept', 'application/json')
      .send({
        language: this.state.language,
        content: content
      }).end(function(res) {
        console.log(res);
      });
  }, 2000),

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
