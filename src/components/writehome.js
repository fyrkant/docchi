var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var WriteStore = require('../stores/writestore');
// var  _ = require('lodash');
// var StoryNode = require('./storynode');
// var WriterForm = require('./writerform');

var WriteHome = React.createClass({
  mixins:[Reflux.connect(WriteStore), Router.State],
  getInitialState() {
    return {
      stories: {},
      selected:''
    };
  },
  render() {
    return (
      <div>
        <div className="write-new">
          <h2><Router.Link to="WriteNew">Ny historia.</Router.Link></h2>
        </div>
        <div className="write-new">
          <h2><Router.Link to="List">Lista oavslutade.</Router.Link></h2>
        </div>
      </div>);
  }
});

module.exports = WriteHome;
