/** @jsx React.DOM **/

var React = require('react');

var LanguageMenu = React.createClass({
  render: function() {
    return (
      <select onChange={this.onChange}>
        <optgroup label="Standard">
          <option value="css">CSS</option>
          <option value="javascript">JavaScript</option>
        </optgroup>
        <optgroup label="CSS">
          <option value="css">CSS</option>
          <option value="sass">SASS</option>
          <option value="scss">SCSS</option>
          <option value="less">LESS</option>
          <option value="stylus">Stylus</option>
        </optgroup>
        <optgroup label="JavaScript">
          <option value="javascript">JavaScript</option>
          <option value="coffeescript">CoffeScript</option>
        </optgroup>
      </select>
    );
  },

  onChange: function(event) {
    this.props.onSelect && this.props.onSelect(event.target.value);
  }
});

module.exports = LanguageMenu;
