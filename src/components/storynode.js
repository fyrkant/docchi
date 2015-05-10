var React = require('react'),
		_ = require('lodash'),
		actions = require('../actions');

var StoryNode = React.createClass({
	clickSelect(ev){

		actions.changeFocus(this.props.selected, "Skriv fortsättning på "+"\""+this.props.selected.title+"\"");

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
	render() {

		return !this.props.selected ? <div /> : (
			<div onDoubleClick={this.clickSelect} >
				<div className="panel panel-default story-part">
					<div className="panel-heading">
						<h3 className="panel-title">{this.props.selected.title} <button onClick={this.storypartDestroyer} className="btn btn-xs btn-danger pull-right">X</button></h3>
					</div>
					<div className="panel-body">
						<p>{this.props.selected.txt}</p>
					</div>
				</div>
				<div className="child-divs">
					{_.map(this.props.selected.children, function(n){
						return <StoryNode key={n.key} stories={this.props.stories} selected={_.find(this.props.stories, function(s){return s.key === n.key;})} />;
					}.bind(this))}
				</div>
			</div>
			);



	}

});

module.exports = StoryNode;
