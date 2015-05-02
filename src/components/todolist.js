var React = require('react'),
	_ = require('lodash'),
	ListItem = require('./listitem');

var TodoList = React.createClass({
	propTypes:{
		items: React.PropTypes.oneOfType([
			React.PropTypes.array,
			React.PropTypes.object
		]).isRequired
	},
	render: function() {
		var createItem = (itemText, index) => {
			return <ListItem key={index} itemText={itemText} onClick={this.handleClick} index={index} />;
		};
		return <div className="col-sm-8 fluid"><table className="table table-hover"><tbody>{_.map(this.props.items, createItem)}</tbody></table></div>;
	}

});

module.exports = TodoList;
