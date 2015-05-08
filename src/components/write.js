var React = require('react'),
		Reflux = require('reflux'),
		actions = require('../actions'),
		WriteStore = require('../stores/writestore'),
		_ = require('lodash'),
		StoryNode = require('./storynode'),
		StoryList = require('./storylist'),
		ReactFireMixin = require('reactfire'),
		Firebase = require('firebase'),
		WriterForm = require('./writerform');


var firebaseRef = new Firebase("https://blazing-fire-8429.firebaseio.com/storyparts/");


var WriteApp = React.createClass({
	mixins:[ReactFireMixin, Reflux.connect(WriteStore, "stories")],
  componentWillMount: function() {
		this.bindAsObject(firebaseRef, "storyParts");
	},
	handleClick:function(key){
		//console.log(key);
		var foundSelected = _.find(this.state.storyParts, function(s){return s.key === key;});

		this.setState({selected: foundSelected, /*h3: "fortsättning på "+foundSelected.title*/});
	},
	handleChildClick:function(key){
		this.setState({isChild: true});

		var foundSelected = _.find(this.state.storyParts, function(s){return s.key === key;});

		this.setState({selected: foundSelected, h3: "fortsättning på "+foundSelected.title});
	},
	render: function() {
		actions.keyUpped;

		var storyNode = _.isEmpty(this.state.selected) ? "" : <StoryNode key={this.state.selected.key} stories={this.state.storyParts} data={this.state.selected} handleClick={this.handleChildClick} />;
		var storyListClass = _.isEmpty(_.filter(this.state.storyParts, function(s){return s.isParent;})) ? "hide" : "panel panel-default";

		return (
		<div>
			<div className="col-sm-6">
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title">Skriv: <strong>{this.state.h3}</strong></h3>
					</div>
					<div className="panel-body">
						<WriterForm selected={this.state.selected} isChild={this.state.isChild} />
					</div>
				</div>
				<div className={storyListClass}>
					<div className="panel-body">
						<h4>Påbörjade:</h4>
						<StoryList stories={this.state.storyParts} handleClick={this.handleClick} />
					</div>
				</div>
			</div>
			{storyNode}
		</div>
		);
	}
});

module.exports = WriteApp;
