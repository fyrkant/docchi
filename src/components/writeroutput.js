var React = require('react');

var WriterOutput = React.createClass({

	render: function() {
		return (
			<div className="col-sm-4">
				<h4>{this.props.title}</h4>
				<p>{this.props.txt}</p>
			</div>
		);
	}

});

module.exports = WriterOutput;
