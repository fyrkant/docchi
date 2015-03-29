/** @jsx React.DOM */

var React = require('react');

var App = React.createClass({
	getInitialState:function(){
		return {
			txt: ""
		}
	},
	update:function(e){
		this.setState({txt: e.target.value});
	},
	render:function(){
		return (
			<div>
				<Widget txt={this.state.txt} update={this.update} />
			</div>
			);
	}
});

var Widget = React.createClass({
	render:function(){
		return (
			<div>
				<input type="text" onChange={this.props.update} />
				<br />
				<h1>{this.props.txt}</h1>
			</div>
			);
	}
});

React.render(<App txt="this is the txt prop" />, document.body)
