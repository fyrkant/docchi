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
				<h4>{actions.getParent().title}</h4>
				<p >{actions.getParent().txt}</p>
			</div>
		);
	}

});

module.exports = WriterOutput;
