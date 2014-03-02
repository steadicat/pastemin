/** @jsx React.DOM **/

var React = require('react');

var defaultText = '/* Type the code of your asset here. */\n\n\n';

var Editor = React.createClass({

  render: function() {
    return (
      <div id="editor">
        {this.props.text || defaultText}
      </div>
    );
  },

  componentDidMount: function() {
    if (typeof ace !== 'undefined') {
      var editor = this._editor = ace.edit('editor');
      editor.setTheme('ace/theme/tomorrow');
      editor.session.setMode('ace/mode/' + this.props.language);
      editor.setFontSize(14);
      editor.setHighlightActiveLine(false);
      editor.setShowPrintMargin(false);
      editor.renderer.setShowGutter(false);
      editor.renderer.setPadding(32);
      editor.session.setUseWrapMode(true);
      editor.session.setTabSize(2);
      editor.session.on('change', this.onChange);
    }
  },

  componentDidUpdate: function() {
    this._editor.session.setMode('ace/mode/' + this.props.language);
  },

  onChange: function() {
    this.props.onChange && this.props.onChange(this._editor.getValue());
  }

});

module.exports = Editor;
