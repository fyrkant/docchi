var React = require('react'),
	WriterOutput = require('./writeroutput'),
	Reflux = require('reflux'),
	Firebase = require('firebase'),
	myFirebase = new Firebase("https://blazing-fire-8429.firebaseio.com/docchi/"),
	ReactFireMixin = require('reactfire'),
	WriteStore = require('../stores/writestore');
	// _ = require('lodash'),
	// $ = require('jquery'),
	
	// TodoList = require('./todolist'),
	// actions = require('../actions'),
	

var TodoApp = React.createClass({
	mixins:[ReactFireMixin, Reflux.connect(WriteStore)],
	getInitialState:function(){
		return {storyPart: {key: "", title: "", txt: ""}};
	},
	onChange: function(){
		this.setState({
			storyPart: {
				title: this.refs.title.getDOMNode().value,
				txt: this.refs.txt.getDOMNode().value
			}
		});
	},
	componentWillMount: function() {
		this.bindAsObject(myFirebase, "parts");
	},
	render: function() {
		return (
		<div>		
			<div className="col-sm-6">
				<h3>SKRIV</h3>
				<div className="col-sm-8">
					<form>
						<input type="text" 
							ref="title"
							className="form-control" 
							placeholder="Titel" 
							onChange={this.onChange}
							value={this.state.storyPart.title} />

						<textarea ref="txt"
							className="form-control"
							placeholder="Text"
							onChange={this.onChange}
							value={this.state.storyPart.txt}
							/>
					</form>

				</div>				
			</div>			
			<WriterOutput 
				title={this.state.storyPart.title}
				txt={this.state.storyPart.txt} />
		</div>
		);
	},
	componentWillUnmount: function() {
	}

});

module.exports = TodoApp;
