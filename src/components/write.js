var React = require('react'),
		Reflux = require('reflux'),
		DocchiStore = require('../stores/docchistore'),
		_ = require('lodash'),
		jquery = require('jquery'),
		StoryNode = require('./storynode'),
		StoryList = require('./storylist'),
		WriterForm = require('./writerform'),
		actions = require('../actions');

require('jquery-ui');

var WriteApp = React.createClass({
	mixins:[Reflux.connect(DocchiStore)],
	getInitialState(){
		return {
			h3:"ny historia",
			stories: {},
			selected:{},
			focused:{}
			};
	},
	handleClick(key){

		var foundSelected = _.find(this.state.stories, function(s){return s.key === key;});

		if (foundSelected.isParent){
			console.log("true "+foundSelected.isParent);
		} else {
			console.log("false "+foundSelected.isParent);
		}

		actions.changeSelected(foundSelected);
	},
	componentDidMount(){
		jquery("#drag").draggable();
		jquery("#selectable").selectable();
	},
	render() {
		var storyListClass = _.isEmpty(_.filter(this.state.stories, function(s){return s.isParent;})) ? "hide" : "panel panel-default";

		return (
		<div>
			<div className="col-sm-6">
				<div id="drag" className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title">Skriv: <strong>{this.state.h3}</strong></h3>
					</div>
					<div className="panel-body">
						<WriterForm focus={this.state.focus} />
					</div>
				</div>
				<div className={storyListClass}>
					<div className="panel-body">
						<h4>Påbörjade:</h4>
						<StoryList stories={this.state.stories} handleClick={this.handleClick} />
					</div>
				</div>
			</div>
			<StoryNode key={this.state.selected.key} stories={this.state.stories} selected={this.state.selected} />
		</div>
		);
	}
});

module.exports = WriteApp;
