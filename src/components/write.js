var React = require('react'),
		Reflux = require('reflux'),
		actions = require('../actions'),
		WriteStore = require('../stores/writestore'),
		_ = require('lodash'),
		WriterOutput = require('./writeroutput'),
		StoryList = require('./storylist'),
		ReactFireMixin = require('reactfire'),
		Firebase = require('firebase'),
		WriterForm = require('./writerform');


var firebaseRef = new Firebase("https://blazing-fire-8429.firebaseio.com/storyparts/");

var WriteApp = React.createClass({
	mixins:[ReactFireMixin, Reflux.connect(WriteStore)],
	getInitialState:function(){
		return {
			storyParts:{},
			parent:{}};
	},
	componentWillMount: function() {
		this.bindAsObject(firebaseRef, "storyParts");

	},
	componentDidMount:function(){
		this.setState({parent: _.find(this.state.storyParts, function(s){return s.key === "-Jo_hiXPEvAf4eLI_sKA";})});
	},
	render: function() {
		actions.keyUpped;
		return (
		<div>
			<div className="col-sm-6">
				<h3>SKRIV</h3>
				<div className="col-sm-8">

					<WriterForm parent={this.state.parent} />

					<StoryList stories={this.state.storyParts} />

				</div>
			</div>
			<WriterOutput	/>
		</div>
		);
	}
});

module.exports = WriteApp;
