var React = require('react'),	
	Firebase = require('firebase'),
	ReactFireMixin = require('reactfire'),
	TodoList = require('./todolist');


var TodoApp = React.createClass({
	mixins:[ReactFireMixin],
	getInitialState: function(){
		return {items: [], text: ""};
	},
	onChange: function(e){
		this.setState({text: e.target.value});
	},
	handleSubmit: function(e){
		e.preventDefault();
		this.firebaseRefs["items"].push({
			text: this.state.text
		});
		this.setState({text: ""});
	},
	componentWillMount: function() {
		this.bindAsArray(new Firebase("https://blazing-fire-8429.firebaseio.com/items/"), "items");
	},
	removeText:function(){
		console.log("test");
	},	
	render: function() {
		return (
			<div>
				<h3>TODO</h3>
				<TodoList items={this.state.items} removeText={this.removeText} />
				<form onSubmit={this.handleSubmit}>
					<input onChange={this.onChange} 
					 value={this.state.text} />
					<button>{"Add #" + (this.state.items.length +1)}</button>
				</form>
			</div>
		);
	},
	componentWillUnmount: function() {
	}

});

module.exports = TodoApp;