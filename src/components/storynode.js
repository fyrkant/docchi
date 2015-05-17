var React = require('react'),
		_ = require('lodash'),
		// Accordion = require('./accordion'),
		actions = require('../actions');

var StoryNode = React.createClass({
	clickSelect(ev){

		actions.changeFocus(this.props.selected, this.props.selected.title);

		ev.preventDefault();
		ev.stopPropagation();
	},
	toBeBlownUp: [],
	visitChildren(obj){

		this.toBeBlownUp.push(obj.key);

		if(!obj.children) {
			return;
		}

		_.forEach(obj.children, function(child){
			var foundChild = _.find(this.props.stories, function(s){return s.key === child.key;});
			this.visitChildren(foundChild);
		}.bind(this));
	},
	storypartDestroyer(){
		this.toBeBlownUp = [];

		var parentKey = "";

		_.map(this.props.stories, function(story){
			if(story.children){
				_.forEach(story.children, function(child) {
					if (child.key === this.props.selected.key) {
						parentKey = story.key;
					}
				}.bind(this));
			}
		}.bind(this));

		if(!this.props.selected.children){
			if(confirm("Vill du verkligen radera historiadelen med titel "+this.props.selected.title+" ?")){

				actions.destroyStoryPart(this.props.selected.key, parentKey);
			}
		} else {
			if(confirm("VARNING! Historiedelen du vill radera har barn som också kommer att raderas, är du säker på att du vill detta?")){
				this.visitChildren(this.props.selected);

				actions.destroyStoryParts(this.toBeBlownUp, parentKey);
			}
		}
	},
	shower(ev){
		ev.target.nextSibling.classList.toggle('hide');
	},
	render() {


		return !this.props.selected ? <div /> : (
			<ul className="tree">
				<li>
					<a href="#" onClick={this.shower}>{this.props.selected.title}</a>
					<div className="hide story-node">
						<p>{this.props.selected.txt}</p>

						<button onClick={this.clickSelect}> + </button>
						<button onClick={this.storypartDestroyer}> - </button>
					</div>

						{_.map(this.props.selected.children, function(n){
							return <StoryNode key={n.key} stories={this.props.stories} selected={_.find(this.props.stories, function(s){return s.key === n.key;})} />;
						}.bind(this))}
				</li>
			</ul>
			);
	}
});

module.exports = StoryNode;
