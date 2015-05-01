var React = require('react');
	// Reflux = require('reflux'),
	// Firebase = require('firebase');
	// _ = require('lodash'),
	// $ = require('jquery'),
	// ReactFireMixin = require('reactfire'),
	// TodoList = require('./todolist'),
	// actions = require('../actions'),
	// WriteStore = require('../writestore'),
	// myFirebase = new Firebase("https://blazing-fire-8429.firebaseio.com/docchi/");



var TodoApp = React.createClass({
	// mixins:[ReactFireMixin, Reflux.connect(WriteStore)],
	getInitialState:function(){
		return {storyPart: {key: "", title: "", txt: ""}};
	},
	onChange: function(){
		this.setState({
			storyPart: {
				title: this.refs.title.getDOMNode().value,
				txt: this.refs.txt.getDOMNode().value
			}
		});
	},
	render: function() {
		return (		
			<div className="col-sm-6">
				<h3>SKRIV</h3>
				<div className="col-sm-8">
					<form>
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
							/>
					</form>

				</div>
				<h4>{this.state.storyPart.title}</h4>
				<p>{this.state.storyPart.txt}</p>
			</div>
		);
	},
	componentWillUnmount: function() {
	}

});

module.exports = TodoApp;
