/** @jsx React.DOM **/

var React = require('react');

var Page = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <link
            href="//fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css"
          />
          <link rel="stylesheet" type="text/css" href="/css/main.css" />
        </head>
        <body>
          {this.props.children}
          <script src="/js/vendor/ace/ace.js" />
          <script dangerouslySetInnerHTML={{__html: 'var props = ' + JSON.stringify(this.props.props)}} />
          <script src="/js/pages/Home.js" />
        </body>
      </html>
    );
  }
});

module.exports = Page;
