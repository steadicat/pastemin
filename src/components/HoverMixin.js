/** @jsx React.DOM **/

var HoverMixin = {

  getInitialState: function() {
    return {
      hover: false
    };
  },

  onMouseOver: function() {
    this.props.onMouseOver && this.props.onMouseOver();
    this.setState({hover: true});
  },

  onMouseOut: function() {
    this.props.onMouseOut && this.props.onMouseOut();
    this.setState({hover: false});
  }
};


module.exports = HoverMixin;