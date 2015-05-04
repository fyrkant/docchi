var React = require('react'),
	WriterOutput = require('./writeroutput'),
	StoryList = require('./storylist'),
	ReactFireMixin = require('reactfire'),
	Firebase = require('firebase');


var firebaseRef = new Firebase("https://blazing-fire-8429.firebaseio.com/storyparts/");

var TodoApp = React.createClass({
	mixins:[ReactFireMixin],
	getInitialState:function(){
		return {
				storyParts:{},
				key: "",
				parent: "",
				title: "",
				txt: "",
				children:{
					x: "",
					y: ""
				}};
	},
	onChange: function(){
		this.setState({
				title: this.refs.title.getDOMNode().value,
				txt: this.refs.txt.getDOMNode().value
			});
	},
	handleSubmit:function(e){
		e.preventDefault();
		var newEntry = this.firebaseRefs.storyParts.push({
				parent: this.state.parent,
				title: this.state.title,
				txt: this.state.txt,
				children:this.state.children
		});

		newEntry.update({
			key: newEntry.key()
		});

		this.setState({
					key: "",
					parent: "",
					title: "",
					txt: "",
					children:{
						x: "",
						y: ""
					}
					});
	},
	componentWillMount: function() {
		this.bindAsObject(firebaseRef, "storyParts");
	},
	handleKeyUp: function(evt){
		var text = evt.target.value;
		if (evt.which === 13 && text) {
			console.log("enter");
			//actions.saveStoryPart(this.state.storyPart);
		} else if (evt.which === 27) {
			console.log("esc");
		}
	},
	render: function() {
		return (
		<div>
			<div className="col-sm-6">
				<h3>SKRIV</h3>
				<div className="col-sm-8">
					<form onSubmit={this.handleSubmit}>

						<input type="text"
							ref="title"
							className="form-control"
							placeholder="Titel"
							onChange={this.onChange}
							value={this.state.title} />

						<textarea ref="txt"
							className="form-control"
							placeholder="Text"
							onChange={this.onChange}
							value={this.state.txt}
							onKeyUp={this.handleKeyUp}
							/>

						<button className="btn btn-standard btn-default pull-right">Spara</button>

					</form>

					<StoryList stories={this.state.storyParts} />

				</div>
			</div>
			<WriterOutput
				title={this.state.title}
				txt={this.state.txt} />
		</div>
		);
	}
});

module.exports = TodoApp;
