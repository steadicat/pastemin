/** @jsx React.DOM **/

var React = require('react');

var icons = {
  lock: function(ctx) {
    ctx.beginPath();
    ctx.moveTo(28.0, 30.0);
    ctx.lineTo(4.0, 30.0);
    ctx.lineTo(4.0, 16.1);
    ctx.lineTo(28.0, 16.1);
    ctx.lineTo(28.0, 30.0);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(8.0, 18.2);
    ctx.bezierCurveTo(8.0, 18.2, 8.0, 14.1, 8.0, 14.0);
    ctx.bezierCurveTo(8.0, 9.0, 12.0, 6.0, 16.0, 6.0);
    ctx.bezierCurveTo(20.0, 6.0, 24.0, 9.0, 24.0, 14.0);
    ctx.lineTo(24.0, 17.0);
    ctx.lineWidth = 4.0;
    ctx.stroke();
  },
  unlock: function(ctx) {
    ctx.beginPath();
    ctx.moveTo(28.0, 30.0);
    ctx.lineTo(4.0, 30.0);
    ctx.lineTo(4.0, 16.1);
    ctx.lineTo(28.0, 16.1);
    ctx.lineTo(28.0, 30.0);
    ctx.closePath();
    ctx.fill();

    // unlock/Path
    ctx.beginPath();
    ctx.moveTo(8.0, 17.0);
    ctx.lineTo(8.0, 12.2);
    ctx.bezierCurveTo(8.0, 12.1, 8.0, 12.1, 8.0, 12.0);
    ctx.bezierCurveTo(8.1, 7.3, 10.1, 4.0, 16.0, 4.0);
    ctx.bezierCurveTo(20.1, 4.0, 23.0, 6.8, 23.0, 9.8);
    ctx.lineWidth = 4.0;
    ctx.stroke();
  },
  new: function(ctx) {
    ctx.beginPath();
    ctx.moveTo(19.0, 27.0);
    ctx.lineTo(13.0, 27.0);
    ctx.lineTo(13.0, 5.0);
    ctx.lineTo(19.0, 5.0);
    ctx.lineTo(19.0, 27.0);
    ctx.closePath();
    ctx.fill();

    // new/Path
    ctx.beginPath();
    ctx.moveTo(5.0, 19.0);
    ctx.lineTo(5.0, 13.0);
    ctx.lineTo(27.0, 13.0);
    ctx.lineTo(27.0, 19.0);
    ctx.lineTo(5.0, 19.0);
    ctx.closePath();
    ctx.fill();
  },

  cloud: function(ctx) {
    ctx.beginPath();

    // cloudOn/Compound Path/Path
    ctx.moveTo(24.0, 11.1);
    ctx.bezierCurveTo(22.5, 8.1, 19.5, 6.1, 16.0, 6.1);
    ctx.bezierCurveTo(11.4, 6.1, 7.6, 9.6, 7.1, 14.0);
    ctx.bezierCurveTo(7.1, 14.0, 7.1, 14.0, 7.0, 14.0);
    ctx.bezierCurveTo(4.3, 14.0, 2.0, 16.3, 2.0, 19.0);
    ctx.bezierCurveTo(2.0, 21.8, 4.3, 24.0, 7.0, 24.0);
    ctx.bezierCurveTo(7.0, 24.0, 7.0, 24.0, 7.0, 24.0);
    ctx.lineTo(7.0, 24.0);
    ctx.lineTo(24.0, 24.0);
    ctx.lineTo(24.0, 24.0);
    ctx.bezierCurveTo(27.4, 23.7, 30.0, 20.9, 30.0, 17.5);
    ctx.bezierCurveTo(30.0, 14.1, 27.4, 11.3, 24.0, 11.1);
    ctx.closePath();
    ctx.fill();
  },

  cloudOff: function(ctx) {
    ctx.beginPath();

    // cloud/Compound Path/Path
    ctx.moveTo(23.9, 11.2);
    ctx.bezierCurveTo(22.5, 8.3, 19.5, 6.3, 16.0, 6.3);
    ctx.bezierCurveTo(11.4, 6.3, 7.7, 9.7, 7.2, 14.2);
    ctx.bezierCurveTo(7.2, 14.2, 7.2, 14.1, 7.1, 14.1);
    ctx.bezierCurveTo(4.4, 14.1, 2.2, 16.4, 2.2, 19.1);
    ctx.bezierCurveTo(2.2, 21.8, 4.4, 24.0, 7.1, 24.0);
    ctx.bezierCurveTo(7.1, 24.0, 7.1, 24.0, 7.1, 24.0);
    ctx.lineTo(7.1, 24.0);
    ctx.lineTo(23.9, 24.0);
    ctx.lineTo(23.9, 24.0);
    ctx.bezierCurveTo(27.2, 23.7, 29.8, 21.0, 29.8, 17.6);
    ctx.bezierCurveTo(29.8, 14.2, 27.2, 11.5, 23.9, 11.2);
    ctx.closePath();

    // cloud/Compound Path/Path
    ctx.moveTo(20.9, 18.0);
    ctx.lineTo(18.8, 20.1);
    ctx.lineTo(16.0, 17.3);
    ctx.lineTo(13.3, 20.1);
    ctx.lineTo(11.2, 18.0);
    ctx.lineTo(14.0, 15.2);
    ctx.lineTo(11.2, 12.5);
    ctx.lineTo(13.3, 10.4);
    ctx.lineTo(16.0, 13.2);
    ctx.lineTo(18.8, 10.4);
    ctx.lineTo(20.9, 12.5);
    ctx.lineTo(18.1, 15.2);
    ctx.lineTo(20.9, 18.0);
    ctx.closePath();
    ctx.fill();
  },

  publish: function(ctx) {
    ctx.beginPath();
    ctx.moveTo(23.4, 12.2);
    ctx.lineTo(8.8, 26.8);
    ctx.lineTo(4.7, 22.7);
    ctx.lineTo(19.3, 8.1);
    ctx.lineTo(23.4, 12.2);
    ctx.closePath();
    ctx.fill();

    // publish/Path
    ctx.beginPath();
    ctx.moveTo(9.0, 7.0);
    ctx.lineTo(25.0, 7.0);
    ctx.lineTo(25.0, 22.0);
    ctx.lineTo(19.0, 13.0);
    ctx.lineTo(9.0, 7.0);
    ctx.closePath();
    ctx.fill();
  },

  chevron: function(ctx) {
    ctx.beginPath();
    ctx.moveTo(8.0, 12.0);
    ctx.lineTo(24.0, 12.0);
    ctx.lineTo(16.0, 24.0);
    ctx.lineTo(8.0, 12.0);
    ctx.closePath();
    ctx.fill();
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

  getContext: function() {
    var ctx = this.getDOMNode().getContext('2d');
    if (this.props.color) {
      ctx.fillStyle = this.props.color;
      ctx.strokeStyle = this.props.color;
    }
    return ctx;
  },

  componentDidMount: function() {
    icons[this.props.icon](this.getContext());
  },

  componentDidUpdate: function(prevProps) {
    var ctx = this.getContext();
    ctx.clearRect(0, 0, 32, 32);
    icons[this.props.icon](ctx);
  }

});

module.exports = Icon;
