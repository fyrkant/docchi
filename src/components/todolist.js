var React = require('react'),
	_ = require('lodash');

var TodoList = React.createClass({
	propTypes:{
		onClick: React.PropTypes.func.isRequired,
		items: React.PropTypes.oneOfType([
			React.PropTypes.array,
			React.PropTypes.object
		]).isRequired
	},
	handleClick: function(index){
		this.props.clickFunc(index);
	},
	render: function() {
		var createItem = (itemText, index) => {
			return <tr key={index + itemText}>
					<td><p className="list-text">{itemText}</p>
					<a className="btn btn-xs btn-danger pull-right" onClick={this.handleClick.bind(this, index)}>X</a></td></tr>;
		};
		return <div className="col-sm-8 fluid"><table className="table table-hover"><tbody>{_.map(this.props.items, createItem)}</tbody></table></div>;
	}

});

module.exports = TodoList;
