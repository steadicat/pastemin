/** @jsx React.DOM **/

var React = require('react');
var Icon = require('./Icon');
var Button = require('./Button');
var HoverMixin = require('./HoverMixin');
var Obj = require('../lib/Obj');
var Random = require('../lib/Random');

var Dropdown = React.createClass({

  mixins: [HoverMixin],

  getInitialState: function() {
    this._groups = this.getGroups(this.props.options).map(function(group) {
      return {name: group, options: this.getOptions(group)};
    }.bind(this));

    var selected = this._groups[0].options.filter(function(option) {
      return option.id == this.props.selected;
    }.bind(this));

    return {
      selected: selected[0],
      expanded: false
    };
  },

  render: function() {
    var menu = null;
    if (this.state.expanded) {
      menu =
        <div
          className="abs z100 white-bg gray-border rounded-rb"
          style={{
            marginTop: -1,
            borderTopColor: '#aeafad',
            minWidth: '100%'
          }}>
          {this._groups.map(function(group) {
            return (
              <div key={group.name}>
                {this._groups.length && <div className="gray phm">{group.name}</div>}
                {group.options.map(function(option) {
                  return (
                    <div
                      key={option.id}
                      className={'pointer pll prm' + (this.state.hovered && (this.state.hovered._id == option._id) ? ' gray-bg white' : '')}
                      onMouseOver={this.onOptionHover.bind(this, option)}
                      onClick={this.onOptionClick.bind(this, option)}>
                      {option.name}
                    </div>
                  );
                }.bind(this))}
              </div>
            );
          }.bind(this))}
        </div>;
    }
    return this.transferPropsTo(
      <div className="rel">
        <Button
          color="gray"
          fill={this.state.expanded}
          onClick={this.onClick}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
          className={this.state.expanded ? 'rounded-top' : ''}>
          <div className="ib mid">{this.props.label}:&nbsp;</div>
          <div className={'ib mid prm br ' + ((this.state.hover||this.state.expanded) ? 'white white-border' : 'black gray-border')}>
            {this.state.selected && this.state.selected.name}
          </div>
          <Icon
            icon="chevron"
            color={(this.state.hover || this.state.expanded) ? 'white' : 'gray'}
            className="ib mid rel"
            style={{left: 12, marginLeft: -8}}
          />
        </Button>
        {menu}
      </div>
    );
  },

  onClick: function(event) {
    event.preventDefault();
    this.setState({expanded: !this.state.expanded});
    return false;
  },

  onOptionHover: function(option) {
    this.setState({hovered: option, selected: option});
  },

  onOptionClick: function(option) {
    this.setState({selected: option, expanded: false});
    this.props.onSelect && this.props.onSelect(option.id);
  },

  getGroups: function() {
    return Obj.keys(this.props.options);
  },

  getOptions: function(group) {
    return Obj.values(this.props.options[group]).map(function(x) {
      return Obj.merge(x, {_id: Random.getID()});
    });
  }

});

module.exports = Dropdown;