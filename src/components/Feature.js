/** @jsx React.DOM **/

var React = require('react');

var Feature = React.createClass({

  render: function() {
    return this.transferPropsTo(
      <div className="ib top mam left" style={{width: '20%'}}>
        {this.props.children}
      </div>
    );
  }

});

module.exports = Feature;