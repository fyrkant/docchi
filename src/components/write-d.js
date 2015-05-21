var React = require('react');
var Reflux = require('reflux');
// var Router = require('react-router');
var WriteStore = require('../stores/writestore');
// var  _ = require('lodash');
// var StoryNode = require('./storynode');
// var WriterForm = require('./writerform');
var LeanStoryList = require('./leanstorylist');
var BetaWriter = require('./beta-form');

var WriteApp = React.createClass({
  mixins:[Reflux.connect(WriteStore)],
  getInitialState() {
    return {
      statusWord:'Skriv',
      h3:'Ny historia',
      stories: {},
      selected:'',
      focus:{}
    };
  },
  render() {
    return (
    <div className="write-home">
			<div className="write-new">
				<h2>Skriv ny historia.</h2>
				<BetaWriter stories={this.state.stories} />
			</div>

			<div className="list-unfinished">
				<h2>Lista på oavslutade:</h2>
				<LeanStoryList stories={this.state.stories} />
			</div>
		</div>
		);
  }
});

module.exports = WriteApp;
