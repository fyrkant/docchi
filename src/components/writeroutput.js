var React = require('react'),
		Reflux = require('reflux'),
		WriteStore = require('../stores/writestore'),
		actions = require('../actions');

var WriterOutput = React.createClass({
	mixins: [Reflux.connect(WriteStore)],
	getDefaultProps:function(){
		return {
			parent: {title: "titel", txt: "text"}
		};
	},
	render: function() {

		return (
			<div className="col-sm-4">
				<h4>{this.props.parent.title}</h4>
				<p >{this.props.parent.txt}</p>
			</div>
		);
	}

});

module.exports = WriterOutput;
