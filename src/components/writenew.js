var React = require('react'),
		Reflux = require('reflux'),
		DocchiStore = require('../stores/docchistore'),
		_ = require('lodash'),
		StoryNode = require('./storynode'),
		WriterForm = require('./writerform');


var WriteNew = React.createClass({
	mixins:[Reflux.connect(DocchiStore)],
	getInitialState(){
		return {
			statusWord:"Skriv",
			h3:"Ny historia",
			stories: {},
			selected:"",
			focus:{}
			};
	},
	render() {

		//console.log(this.props.params.id);

		var storyNodeClass = _.isEmpty(this.state.selected) ? "hide" : "";

		//var selectedStory = _.find(this.props.stories, function(story){ return story.key === this.props.key; }.bind(this));

		return (
		<div>
			<div className={storyNodeClass}>
				<StoryNode key={this.state.selected.key} stories={this.state.stories} selected={this.state.selected} />
			</div>

			<WriterForm focus={this.state.focus} h3={this.state.h3} statusWord={this.state.statusWord} stories={this.state.stories} />
		</div>
		);
	}
});

module.exports = WriteNew;
