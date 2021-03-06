/** @jsx React.DOM **/

var React = require('react');
var EditToggle = require('./EditToggle');
var LanguageMenu = require('./LanguageMenu');
var CdnToggle = require('./CdnToggle');
var Publish = require('./Publish');
var Button = require('./Button');

var Toolbar = React.createClass({

  render: function() {
    var editToggle = <EditToggle icon="unlock" className="ib bottom mlm" />;
    editToggle = null;

    return this.transferPropsTo(
      <div className="pbm nowrap gray-border rel bb">
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
          url={this.props.publishedUrl}
          published={this.props.published}
          aborted={this.props.aborted}
          onPublish={this.props.onPublish}
          cdn={this.props.cdn}
          className="ib mid mlm"
        />
        <Button
          icon="new"
          color="green"
          className="mrl ib bottom abs top-right"
          href="/">New</Button>
      </div>
    )
  }

});

module.exports = Toolbar;
