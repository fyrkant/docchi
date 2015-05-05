var React = require('react'),
	WriterOutput = require('./writeroutput'),
	StoryList = require('./storylist'),
	ReactFireMixin = require('reactfire'),
	Firebase = require('firebase'),
	WriterForm = require('./writerform');


var firebaseRef = new Firebase("https://blazing-fire-8429.firebaseio.com/storyparts/");

var WriteApp = React.createClass({
	mixins:[ReactFireMixin],
	getInitialState:function(){
		return {storyParts:{}};
	},
	componentWillMount: function() {
		this.bindAsObject(firebaseRef, "storyParts");
	},
	handleKeyUp: function(evt){
		var text = evt.target.value;
		if (evt.which === 13 && text) {
			console.log("enter");
			//actions.saveStoryPart(this.state.storyPart);
		} else if (evt.which === 27) {
			console.log("esc");
		}
	},
	render: function() {
		return (
		<div>
			<div className="col-sm-6">
				<h3>SKRIV</h3>
				<div className="col-sm-8">

					<WriterForm />

					<StoryList stories={this.state.storyParts} />

				</div>
			</div>
			<WriterOutput
				title={this.state.title}
				txt={this.state.txt} />
		</div>
		);
	}
});

module.exports = WriteApp;
