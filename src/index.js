/** @jsx React.DOM */

var React = require('react');

var APP =
	React.createClass({
		render:function(){
			return (
				<div>					
					<BButton className="btn-primary"><BIcon className="glyphicon-heart" /> Button</BButton>
					<BButton className="btn-danger"><BIcon className="glyphicon-pencil" /> Button</BButton>
					<BButton className="btn-success"><BIcon className="glyphicon-inbox" /> Button</BButton>
				</div>
			)
		}
	});

var BButton =
	React.createClass({		
		render:function(){
			return <a className={'btn ' + this.props.className} >{this.props.children}</a>
		}
	});

var BIcon = 
	React.createClass({
		render:function(){
			return <i className={'glyphicon ' + this.props.className}></i>
		}
	});

React.render(
	<APP />,
	document.body
	);


// var APP = React.createClass({
// 	getInitialState:function(){
// 		return {
// 			red:0,
// 			green:0,
// 			blue:0
// 		}
// 	},
// 	update:function(){
// 		this.setState({
// 			red:this.refs.red.refs.range.getDOMNode().value,
// 			green:this.refs.green.refs.range.getDOMNode().value,
// 			blue:this.refs.blue.refs.range.getDOMNode().value
// 		});
// 	},
// 	render:function(){
// 		return (
// 			<div>
// 				<Slider ref="red"  update={this.update} />
// 				<label>{this.state.red}</label><br />
// 				<Slider ref="green"  update={this.update} />
// 				<label>{this.state.green}</label><br />
// 				<Slider ref="blue" update={this.update} />
// 				<label>{this.state.blue}</label>
// 			</div>
// 			);
// 	}
// });

// var Slider = React.createClass({
// 	render:function(){
// 		return (
// 			<div>			
// 				<input ref="range" type="range" min="0" max="255" onChange={this.props.update} />
// 			</div>
// 			);
// 	}
// });

// React.render(<APP txt="this is the txt prop" />, document.body)
