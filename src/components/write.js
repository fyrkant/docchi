var React = require('react'),
	WriterOutput = require('./writeroutput'),
	Reflux = require('reflux'),
	ReactFireMixin = require('reactfire'),
	WriteStore = require('../stores/writestore'),
	actions = require('../actions'),
	Firebase = require('firebase');
	// _ = require('lodash'),
	// $ = require('jquery'),

	// TodoList = require('./todolist'),
	// actions = require('../actions'),
var myFirebase = new Firebase("https://blazing-fire-8429.firebaseio.com/storypart/");

var TodoApp = React.createClass({
	mixins:[ReactFireMixin, Reflux.connect(WriteStore)],
	getInitialState:function(){
		return {storyPart:
			{
				key: "",
				prepart: "",
				title: "",
				txt: ""}};
	},
	onChange: function(){
		this.setState({
			storyPart: {
				title: this.refs.title.getDOMNode().value,
				txt: this.refs.txt.getDOMNode().value
			}
		});
	},
	handleSubmit:function(e){
		e.preventDefault();
		actions.saveStoryPart.bind(this, this.state);
	},
	ComponentWillMount: function() {
		this.bindAsObject(myFirebase, "storyPart");
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
					<form onSubmit={actions.saveStoryPart.bind(this)}>
						<input type="text"
							ref="title"
							className="form-control"
							placeholder="Titel"
							onChange={this.onChange}
							value={this.state.storyPart.title} />

						<textarea ref="txt"
							className="form-control"
							placeholder="Text"
							onChange={this.onChange}
							value={this.state.storyPart.txt}
							onKeyUp={this.handleKeyUp}
							/>
						<button className="btn btn-standard btn-default pull-right">Spara</button>
					</form>

				</div>
			</div>
			<WriterOutput
				title={this.state.storyPart.title}
				txt={this.state.storyPart.txt} />
		</div>
		);
	},
	componentWillUnmount: function() {
	}

});

module.exports = TodoApp;
