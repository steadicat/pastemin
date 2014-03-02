/** @jsx React.DOM **/

var React = require('react');
var Feature = require('./Feature');
var Button = require('./Button');
var Output = require('./Output');

var Header = React.createClass({

  getInitialState: function() {
    return {expanded: false};
  },

  render: function() {
    return this.transferPropsTo(
      <div className="white-bg scroll transition-height" style={{height: this.state.expanded ? '100%' : this.props.headerHeight}}>
        <div className="phh center">
          <h1 className="text-xl title ptl">Pastemin</h1>
          <h2 className="text-l subtitle">Instant assets.</h2>
          <a
            className={'text-s purple mts block pointer' + (this.state.expanded ? '' : '')}
            onClick={this.toggle}>{this.state.expanded ? 'Go back' : 'Read more'}</a>
          {this.renderMore()}
        </div>
        {this.props.children}
      </div>
    );
  },

  toggle: function() {
    this.setState({expanded: !this.state.expanded});
  },

  collapse: function() {
    this.setState({expanded: false});
  },

  renderMore: function() {
    if (!this.state.expanded) return null;
    return (
      <div className="pvh">
        <p className="mvh text-l ib serif" style={{maxWidth: 600}}>
          The easiest way to create, update, and serve one-off JS and CSS files for user styles, JSFiddle, etc.
        </p>

        <h3 className="mth mbl text-l title">Features</h3>
        <Feature>
          <h4 className="text-m b">Backed by S3</h4>
          <p>Never worry about uptime or data loss.</p>
        </Feature>
        <Feature>
          <h4 className="text-m b">Permalinks</h4>
          <p>Update your assets without updating references.</p>
        </Feature>
        <Feature>
          <h4 className="text-m b">Gzip + Min</h4>
          <p>Maximum compression for smallest possible payloads.</p>
        </Feature>
        <Feature>
          <h4 className="text-m b">CDN (Optional)</h4>
          <p>Enable CloudFront for an extra perf boost.</p>
        </Feature>

        <h3 className="mth mbl text-l title">Coming Soon</h3>
        <Feature>
          <h4 className="text-m b">Flavors</h4>
          <p>SASS, SCSS, LESS, Stylus, CoffeeScript, JSX.</p>
        </Feature>
        <Feature>
          <h4 className="text-m b">Cross-references</h4>
          <p>@import or //=require other assets by ID and keep references in sync.</p>
        </Feature>
        <Feature>
          <h4 className="text-m b">File attachments</h4>
          <p>Link or inline your web fonts and images.</p>
        </Feature>
        <Feature>
          <h4 className="text-m b">Passwords</h4>
          <p>Set a password to control who can edit your assets.</p>
        </Feature>

        <div>
          <Button
            className="text-m pvm phl mvh"
            icon="new"
            fill={true}
            onClick={this.collapse}>Create an asset</Button>
        </div>

        <div className="ib gray" style={{maxWidth: 400}}>
          <h3 className="mtl ptl mbs text-m b light-gray-border bt title">About</h3>
          <p className="serif">Designed and built by <a href="http://twitter.com/steadicat">Stefano J. Attardi</a>.</p>
          <p className="mtl">
            Tip jar:
            <Output value="13imumsLjKuBTE6DHboQZPyfYWVqtYsGsF" className="mlm ib mid" style={{width: 260}}/>
          </p>
        </div>
      </div>
    );
  }

});

module.exports = Header;