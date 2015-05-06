var React = require('react'),
		_ = require('lodash');
		//Reflux = require('reflux'),
		// WriteStore = require('../stores/writestore'),
		// actions = require('../actions');

var WriterOutput = React.createClass({
	getDefaultProps:function(){
		return {
			parent: {title: "titel", txt: "text"}
		};
	},
	handleClick:function(evt){
		this.props.handleClick(evt.target.textContent);
	},
	render: function() {
		var childButtons = !_.isEmpty(this.props.parent) ? <span><button onClick={this.handleClick}>X</button><button onClick={this.handleClick}>Y</button></span> : "";

		var classString = !_.isEmpty(this.props.parent) ? "col-sm-4 well" : "hide";
		
		return (
			<div className={classString}>
				<h4>{this.props.parent.title}</h4>
				<p >{this.props.parent.txt}</p>
				{childButtons}
			</div>
		);
	}

});

module.exports = WriterOutput;
