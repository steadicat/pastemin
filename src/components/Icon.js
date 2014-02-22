/** @jsx React.DOM **/

var React = require('react');

var icons = {
  lock: function(ctx) {
    ctx.beginPath();
    ctx.moveTo(28.0, 31.0);
    ctx.lineTo(4.0, 31.0);
    ctx.lineTo(4.0, 16.2);
    ctx.lineTo(28.0, 16.2);
    ctx.lineTo(28.0, 31.0);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(8.0, 16.0);
    ctx.bezierCurveTo(8.0, 12.7, 9.6, 6.0, 16.0, 6.0);
    ctx.bezierCurveTo(22.4, 6.0, 24.0, 13.2, 24.0, 16.0);
    ctx.lineWidth = 4.0;
    ctx.stroke();
  },
  unlock: function(ctx) {
    ctx.beginPath();
    ctx.moveTo(28.0, 31.0);
    ctx.lineTo(4.0, 31.0);
    ctx.lineTo(4.0, 16.2);
    ctx.lineTo(28.0, 16.2);
    ctx.lineTo(28.0, 31.0);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(8.0, 16.0);
    ctx.bezierCurveTo(8.0, 8.0, 10.0, 3.0, 16.0, 3.0);
    ctx.bezierCurveTo(20.1, 3.0, 22.0, 6.0, 23.0, 9.0);
    ctx.lineWidth = 4.0;
    ctx.stroke();
  }
};

var Icon = React.createClass({
  render: function() {
    return this.transferPropsTo(
      <canvas
        width="32"
        height="34"
        style={{
          height: 18,
          width: 16
        }}
      />
    );
  },

  componentDidMount: function() {
    icons[this.props.icon](this.getDOMNode().getContext('2d'));
  },

  componentDidUpdate: function(prevProps) {
    if (prevProps.icon !== this.props.icon) {
      var ctx = this.getDOMNode().getContext('2d');
      ctx.clearRect(0, 0, 32, 32);
      icons[this.props.icon](ctx);
    }
  }

});

module.exports = Icon;
