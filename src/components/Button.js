/** @jsx React.DOM **/

var React = require('react');
var Icon = require('./Icon');
var HoverMixin = require('./HoverMixin');

var colors = {
  purple: '#81549f',
  gray: '#aeafad',
  green: '#718c00',
  white: '#fff'
};

var Button = React.createClass({

  mixins: [HoverMixin],

  getDefaultProps: function() {
    return {
      color: 'purple',
      fill: false
    };
  },

  render: function() {
    var colorName = this.props.loading ? 'gray' : this.props.color;
    var fill = !this.props.loading && (this.state.hover || (this.props.fill && !this.props.loading));
    var icon = !this.props.loading && this.props.icon;
    var iconColor = this.props.loading ? colors.gray : (fill || this.state.hover) ? colors.white : colors[colorName];

    var progress = this.props.loading &&
      <div
        className="gray-bg abs top-left t-width"
        style={{width: this.props.progress * 100 + '%', height: 26, opacity: 0.2}}>
        {' '}
      </div>;

    return this.transferPropsTo(
      <a
        role="button"
        className={'button center rel ib pointer phm pvs border-box button-' + colorName + (fill ? '-fill' : '')}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}>
        {progress}
        {icon && <Icon icon={icon} color={iconColor} className="ib mid z1" style={{marginBottom: -1, marginLeft: -2}} />}
        <span className={'ib mid' + (this.props.icon ? ' mls' : '')}>
          {this.props.children}
        </span>
      </a>
    );
  }

});

module.exports = Button;
