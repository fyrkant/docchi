var React = require('react'),
		Reflux = require('reflux'),
		DocchiStore = require('../stores/docchistore'),
		_ = require('lodash'),
		jquery = require('jquery'),
		StoryNode = require('./storynode'),
		StoryList = require('./storylist'),
		WriterForm = require('./writerform');

require('jquery-ui');

var WriteApp = React.createClass({
	mixins:[Reflux.connect(DocchiStore)],
	getInitialState(){
		return {
			h3:"ny historia",
			stories: {},
			selected:{},
			focus:{}
			};
	},
	componentDidMount(){
		jquery("#drag").draggable();
		jquery("#selectable").selectable();

		jquery("#show-drawer").click(function(){
			jquery(".drawer").toggle("slide", { direction: "right" }, 500);
		});

	},
	render() {
		var storyListClass = _.isEmpty(_.filter(this.state.stories, function(s){return s.isParent;})) ? "hide" : "story-list panel panel-default";

		var storyNodeClass = _.isEmpty(this.state.selected) ? "hide" : "tree";

		var activated = storyNodeClass !== "tree" && _.isEmpty(this.state.focus) ? true : false;

		return (
		<div>
				<WriterForm focus={this.state.focus} activated={activated} h3={this.state.h3} />
				<div className={storyListClass}>
					<h4>Påbörjade:</h4>
					<StoryList stories={this.state.stories} />
				</div>

			<div className={storyNodeClass}>
				<StoryNode key={this.state.selected.key} stories={this.state.stories} selected={this.state.selected} />
			</div>
		</div>
		);
	}
});

module.exports = WriteApp;
