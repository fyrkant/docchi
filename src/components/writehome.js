var React = require('react');
var LeanStoryList = require('./leanstorylist');
var StartForm = require('./writestartform');
var Router = require('react-router');
// var  _ = require('lodash');
// var StoryNode = require('./storynode');
// var WriterForm = require('./writerform');

var WriteHome = React.createClass({
  mixins:[Router.Navigation],
  componentWillMount() {
    if (!this.props.user) {
      this.replaceWith('home');
    }
  },
  render() {
    return (
      <div className="write-home">
        <StartForm {...this.props} />

        <div className="list-unfinished">
            <LeanStoryList {...this.props} titleText="Lista på oavslutade" isWriteList={true} filter="writing" linkTo="writenodepage" />

            <hr />

            <LeanStoryList {...this.props} titleText="Lista på avslutade" isWriteList={true} filter="done" linkTo="writenodepage" />
        </div>
      </div>);
  }
});

module.exports = WriteHome;
