var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var WriteStore = require('../stores/writestore');
var LeanStoryList = require('./leanstorylist');
var BetaForm = require('./beta-form');
// var  _ = require('lodash');
// var StoryNode = require('./storynode');
// var WriterForm = require('./writerform');

var WriteHome = React.createClass({
  mixins:[Reflux.connect(WriteStore), Router.State],
  render() {
    return (
      <div>
        <BetaForm {...this.props} />
        <LeanStoryList {...this.props} />
      </div>);
  }
});

module.exports = WriteHome;
