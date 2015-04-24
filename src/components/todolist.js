var React = require('react'),
	_ = require('lodash');

var TodoList = React.createClass({	
	handleClick: function(index){
		this.props.clickFunc(index);
	},
	render: function() {
		var createItem = (itemText, index) => {
			return <li key={index + itemText}>{itemText} 
					<button onClick={this.handleClick.bind(this, index)}>X</button></li>;
		};
		return <ul>{_.map(this.props.items, createItem)}</ul>;
	}

});

module.exports = TodoList;
