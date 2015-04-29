var React = require('react'),
	Reflux = require('reflux'),
	Firebase = require('firebase'),
	_ = require('lodash'),
	/*$ = require('jquery'),*/
	ReactFireMixin = require('reactfire'),
	TodoList = require('./todolist'),
	actions = require('../actions'),
	TodoStore = require('../todostore');

var myFirebase = new Firebase("https://blazing-fire-8429.firebaseio.com/items/");


var TodoApp = React.createClass({
	mixins:[ReactFireMixin, Reflux.connect(TodoStore)],
	getInitialState: function(){
		return {items: [], text: ""};
	},
	onChange: function(e){
		this.setState({text: e.target.value});
	},
	handleSubmit: function(e){
		e.preventDefault();
		this.firebaseRefs.items.push({
			text: this.state.text
		});
		this.setState({text: ""});
	},
	componentWillMount: function() {
		this.bindAsObject(myFirebase, "items");
	},
	clickFunc:function(key){
		actions.deleteTodoLine(key);
	},
	render: function() {
		return (		<div className="col-sm-6">
				<h3>TODO</h3>
				<TodoList onClick={this.clickFunc} items={this.state.items} />
				<div className="col-sm-8">
					<form className="form-inline" onSubmit={this.handleSubmit}>
						<div className="form-group">
							<input className="form-control" onChange={this.onChange}
								   value={this.state.text} />
							</div>
						<button className="btn btn-small btn-default">{"Add #" + (_.toArray(this.state.items).length +1)}</button>
					</form>
				</div>
			</div>
		);
	},
	componentWillUnmount: function() {
	}

});

module.exports = TodoApp;
