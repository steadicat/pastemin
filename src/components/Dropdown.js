/** @jsx React.DOM **/

var React = require('react');
var Icon = require('./Icon');
var Button = require('./Button');
var HoverMixin = require('./HoverMixin');

var Dropdown = React.createClass({

  mixins: [HoverMixin],

  getInitialState: function() {
    var group = this.getGroups(this.props.options)[0];
    var selected = this.getOptions(group).filter(function(option) {
      return option.id == this.props.selected;
    }.bind(this));
    return {
      group: group,
      selected: selected[0],
      expanded: false
    };
  },

  render: function() {
    var menu = null;
    if (this.state.expanded) {
      menu =
        <div
          className="abs z100 white-bg gray-border rounded-rb pvm"
          style={{
            marginTop: -1,
            borderTopColor: '#aeafad',
            minWidth: '100%'
          }}>
          {this.getGroups(this.props.options).map(function(group) {
            return (
              <div key={group}>
                <div className="gray phl">{group}</div>
                {this.getOptions(group).map(function(option) {
                  return (
                    <div
                      key={option.id}
                      className={'pointer plh phl' + (this.state.hovered && (this.state.hovered.id == option.id) && (this.state.hovered.group == option.group) ? ' gray-bg white' : '')}
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
          <div className={'ib mid prm ' + ((this.state.hover||this.state.expanded) ? 'white white-border' : 'black gray-border')}  style={{borderWidth: '0 1px 0 0'}}>
            {this.state.selected && this.state.selected.name}
          </div>
          <Icon
            icon="chevron"
            color={(this.state.hover || this.state.expanded) ? 'white' : 'gray'}
            className="ib mid rel"
            style={{left: '3px'}}
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
    return keys(this.props.options);
  },

  getOptions: function(group) {
    var group = this.props.options[group];
    var options = [];
    for (var id in group) {
      options.push({id: id, name: group[id], group: group});
    }
    return options;
  }

});

function keys(obj) {
  var ks = [];
  for (var k in obj) ks.push(k);
  return ks;
}

module.exports = Dropdown;