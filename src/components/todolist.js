var React = require('react');

var TodoList = React.createClass({
	render: function() {
		var createItem = function(itemText, index) {
			return <li key={index + itemText}>{itemText} 
					<button className="btn btn-default">X</button></li>;
		};
		return <ul>{this.props.items.map(createItem)}</ul>;
	}

});

module.exports = TodoList;