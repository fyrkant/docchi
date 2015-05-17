var React = require('react'),
		Reflux = require('reflux'),
		Router = require('react-router'),
		DocchiStore = require('../stores/docchistore'),
		// actions = require('../actions'),
		_ = require('lodash'),
		StoryNode = require('./storynode'),
		WriterForm = require('./writerform');

// var RouteHandler = Router.RouteHandler;


var WriteApp = React.createClass({
	mixins:[Reflux.connect(DocchiStore), Router.State],
	getInitialState(){
		return {
			statusWord:"Skriv",
			h3:"Ny historia",
			stories: {},
			selected:"",
			focus:{}
			};
	},
	componentDidMount: function() {
		console.log(this.context.router.getCurrentParams().key);

		// var key = this.context.router.getCurrentParams().key;
		//
		// var foundSelected = _.find(this.state.stories, function(s){return s.key === key;});
		//
		// actions.changeSelected(foundSelected);
	},
	render() {

		//console.log(this.props.params.id);

		var storyNodeClass = _.isEmpty(this.state.selected) ? "hide" : "";

		//var selectedStory = _.find(this.props.stories, function(story){ return story.key === this.props.key; }.bind(this));

		return (
		<div>

			<div className={storyNodeClass}>
				<StoryNode stories={this.state.stories} key={this.state.selected.key} selected={this.state.selected} />
			</div>


			<WriterForm focus={this.state.focus} h3={this.state.h3} statusWord={this.state.statusWord} stories={this.state.stories} />
		</div>
		);
	}
});

module.exports = WriteApp;
