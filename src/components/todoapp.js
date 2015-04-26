var React = require('react'),
	Reflux = require('reflux'),
	Firebase = require('firebase'),
	_ = require('lodash'),
	$ = require('jquery'),
	ReactFireMixin = require('reactfire'),
	TodoList = require('./todolist'),
	actions = require('../actions'),
	TodoStore = require('../todostore');

var myFirebase = new Firebase("https://blazing-fire-8429.firebaseio.com/items/");


var TodoApp = React.createClass({
	mixins:[ReactFireMixin, Reflux.connect(TodoStore, "items")],
	getInitialState: function(){
		return {items: [], text: ""};
	},
	onChange: function(e){
		this.setState({text: e.target.value});
	},
	//handleSubmit: function(e){
	//	e.preventDefault();
	//	actions.submitTodoLine(e, this);
	//},
	//componentWillMount: function() {
	//	this.bindAsObject(myFirebase, "items");
	//},
	clickFunc:function(key){
		actions.deleteTodoLine(key);
	},
	render: function() {
		return (
			<div>
				<h3>TODO</h3>
				<TodoList clickFunc={this.clickFunc} items={this.state.items} removeText={this.removeText} />
				<form onSubmit={this.handleSubmit}>
					<input onChange={this.onChange}
					 value={this.state.text} />
					<button>{"Add #" + (_.toArray(this.state.items).length +1)}</button>
				</form>
			</div>
		);
	},
	componentWillUnmount: function() {
	}

});

module.exports = TodoApp;