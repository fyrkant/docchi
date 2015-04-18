/** @jsx React.DOM */

var React = require('react');

var APP = React.createClass({
	getInitialState:function(){
		return {
			red:0,
			green:0,
			blue:0
		}
	},
	update:function(){
		this.setState({
			red:this.refs.red.refs.range.getDOMNode().value
		})
	},
	render:function(){
		return (
			<div>
				<NumInput
				 ref="red" 
				 min={0}
				 max={255}
				 step={1}
				 val={+this.state.red}
				 update={this.update}
				 label="Red" />
			</div>
		)
	}
});

var NumInput = React.createClass({
	propTypes:{
		min:React.PropTypes.number,
		max:React.PropTypes.number,
		step:React.PropTypes.number,
		val:React.PropTypes.number,
		label:React.PropTypes.string,
		update:React.PropTypes.func.isRequired,
		type:React.PropTypes.oneOf(['number','range'])

	},
	getDefaultProps:function(){
		return {
			min:null,
			max:null,
			step:1,
			val:0,
			label:'',
			type:'range'
		}
	},
	render:function(){
		var label = this.props.label!=='' ? 
		<label>{this.props.label} : {this.props.val}</label> : ''
		return (
			<div>
				<input
					ref="range"
					type={this.props.type}
					min={this.props.min}
					max={this.props.max}
					step={this.props.step}
					defaultValue={this.props.val}
					onChange={this.props.update} />
					{label}
			</div>
		)
	}
})

React.render(
	<APP />,
	document.body
	);





// var React = require('react');

// var APP =
// 	React.createClass({
// 		getInitialState: function() {
// 			return {increasing:false};
// 		},
// 		update:function(){
// 			var newVal = this.props.val+1;
// 			this.setProps({val:newVal});
// 		},
// 		componentWillReceiveProps: function(nextProps) {
// 			this.setState({increasing:nextProps.val>this.props.val});
// 		},
// 		shouldComponentUpdate: function(nextProps, nextState) {
// 			return nextProps.val % 5 === 0;
// 		},
// 		componentWillUpdate: function(nextProps, nextState) {
// 			console.log("nextProps ===" + JSON.stringify(nextProps))
// 		},
// 		render:function(){
// 			console.log(this.state.increasing);
// 			return <button
// 						onClick={this.update}>
// 						{this.props.val}
// 					</button>			
// 		},
// 		componentDidUpdate: function(prevProps, prevState) {
// 			console.log("prevProps ===" + JSON.stringify(prevProps));
// 		},
// 	});


// React.render(
// 	<APP val={0} />,
// 	document.getElementById("panel")
// 	);




// var React = require('react');

// var APP =
// 	React.createClass({
// 		update:function(){
// 			var newVal = this.props.val+1
// 			this.setProps({val:newVal})
// 		},
// 		componentWillMount:function(){
// 			this.setState({m:2});
// 			if (this.props.val===0) {
// 				this.btnStyle = {'color':'red'}
// 			};
// 		},
// 		render:function(){
// 			console.log("hello world")
// 			return <button
// 						style={this.btnStyle} 
// 						onClick={this.update}>
// 						{this.props.val*this.state.m}
// 					</button>			
// 		},
// 		componentDidMount:function(){
// 			this.inc = setInterval(this.update,500);
// 		},
// 		componentWillUnmount:function(){
// 			console.log("goodbye cruel world");
// 			clearInterval(this.inc);
// 		}
// 	});

// window.render = function(){
// 	React.render(
// 		<APP val={0} />,
// 		document.getElementById("panel")
// 		);
// }

// window.unmount = function(){
// 	React.unmountComponentAtNode(document.getElementById("panel"));
// }



// var React = require('react');

// var APP =
// 	React.createClass({
// 		render:function(){
// 			return (
// 				<div>					
// 					<BButton className="btn-primary"><BIcon className="glyphicon-heart" /> Button</BButton>
// 					<BButton className="btn-danger"><BIcon className="glyphicon-pencil" /> Button</BButton>
// 					<BButton className="btn-success"><BIcon className="glyphicon-inbox" /> Button</BButton>
// 				</div>
// 			)
// 		}
// 	});

// var BButton =
// 	React.createClass({		
// 		render:function(){
// 			return <a className={'btn ' + this.props.className} >{this.props.children}</a>
// 		}
// 	});

// var BIcon = 
// 	React.createClass({
// 		render:function(){
// 			return <i className={'glyphicon ' + this.props.className}></i>
// 		}
// 	});

// React.render(
// 	<APP />,
// 	document.body
// 	);


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
