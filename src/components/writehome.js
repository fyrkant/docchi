var React = require('react');
var LeanStoryList = require('./leanstorylist');
var BetaForm = require('./beta-form');
// var  _ = require('lodash');
// var StoryNode = require('./storynode');
// var WriterForm = require('./writerform');

var WriteHome = React.createClass({
  render() {
    return (
      <div>
        <BetaForm {...this.props} />

        <div className="list-unfinished">
            <LeanStoryList {...this.props} titleText="Lista på oavslutade" filter="writing" linkTo="writenodepage" />

            <hr />

            <LeanStoryList {...this.props} titleText="Lista på avslutade" filter="done" linkTo="writenodepage" />
        </div>
      </div>);
  }
});

module.exports = WriteHome;
