var React = require('react');
var Router = require('react-router');
// var  _ = require('lodash');
// var StoryNode = require('./storynode');
// var WriterForm = require('./writerform');

var WriteApp = React.createClass({

  render() {
    return (
      <div className="write-home">
        <Router.RouteHandler {...this.props} />
      </div>);
  }
});

module.exports = WriteApp;
