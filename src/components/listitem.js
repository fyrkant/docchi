var React = require('react'),
	Reflux = require('reflux'),
	actions = require('../actions'),
	TodoStore = require('../stores/todostore');

var ListItem = React.createClass({
	mixins:[Reflux.connect(TodoStore)],
	handleClick:function(key){
		actions.deleteTodoLine(key);
	},
	render: function() {
		return (
			<tr>
				<td>
					<p className="list-text">{this.props.itemText}</p>
					<a className="btn btn-xs btn-danger pull-right" 
						onClick={actions.deleteTodoLine.bind(this, this.props.index)}>X</a>
				</td>
			</tr>
		);
	}

});

module.exports = ListItem;