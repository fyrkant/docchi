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
			h3:"Ny historia",
			storyParts:{},
			parent:{}};
	},
	componentWillMount: function() {
		this.bindAsObject(firebaseRef, "storyParts");
	},
	handleClick:function(key){
		console.log(key);
		var foundParent = _.find(this.state.storyParts, function(s){return s.key === key;});

		this.setState({parent: foundParent, h3: "Fortsätt på "+foundParent.title});
	},
	render: function() {
		actions.keyUpped;
		return (
		<div>
			<div className="col-sm-6">
				<h3>{this.state.h3}</h3>
				<div className="col-sm-8">

					<WriterForm parent={this.state.parent} />

					<StoryList stories={this.state.storyParts} handleClick={this.handleClick} />

				</div>
			</div>
			<WriterOutput parent={this.state.parent}	/>
		</div>
		);
	}
});

module.exports = WriteApp;
