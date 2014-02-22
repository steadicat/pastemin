/** @jsx React.DOM **/

var React = require('react');
var EditToggle = require('../components/EditToggle');
var LanguageMenu = require('../components/LanguageMenu');

var extensions = {
  'javascript': 'js',
  'css': 'css'
};

var Toolbar = React.createClass({

  render: function() {
    return this.transferPropsTo(
      <div className="text-s pbm">
        <div className="ib mid" style={{width: 160}}>
          <div>Language</div>
          <LanguageMenu onSelect={this.props.onLanguageChange} />
        </div>
        <label className="ib mid pointer" style={{width: 240}}>
          <input type="checkbox" className="ib top" />
          <div className="ib top pls">
            <div>Use CloudFront</div>
            <div className="text-xs gray">URL will change with each update</div>
          </div>
        </label>
        <EditToggle icon="unlock" className="ib mid" style={{width: 160}} />
        <div className="ib mid" style={{width: 320}}>
          <div>Public URL</div>
          <input type="text" readOnly="true" value={'http://pastemin.com/' + this.props.id + '.' + extensions[this.props.language]} className="pas" style={{width: 320}} />
        </div>
      </div>
    )
  }

});

module.exports = Toolbar;
