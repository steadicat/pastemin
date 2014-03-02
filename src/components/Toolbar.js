/** @jsx React.DOM **/

var React = require('react');
var EditToggle = require('./EditToggle');
var LanguageMenu = require('./LanguageMenu');
var CdnToggle = require('./CdnToggle');
var Publish = require('./Publish');
var Button = require('./Button');

var extensions = {
  'javascript': 'js',
  'css': 'css'
};

var Toolbar = React.createClass({

  render: function() {
    var editToggle = <EditToggle icon="unlock" className="ib bottom mlm" />;
    editToggle = null;

    return this.transferPropsTo(
      <div className="pbm nowrap gray-border" style={{borderWidth: '0 0 1px 0'}}>
        <LanguageMenu
          className="ib mid"
          language={this.props.language}
          onSelect={this.props.onLanguageChange}
        />
        <CdnToggle
          className="ib mid mlm"
          cdn={this.props.cdn}
          onCdnToggle={this.props.onCdnToggle}
        />
        {editToggle}
        <Publish
          url={'http://pastemin.com/' + this.props.id + '.' + extensions[this.props.language]}
          published={this.props.published}
          cdn={this.props.cdn}
          className="ib mid mlm"
        />
      </div>
    )
  }

});

module.exports = Toolbar;
