var React = require('react'),
		_ = require('lodash'),
		actions = require('../actions');

var StoryNode = React.createClass({
	clickSelect(ev){

		actions.changeFocus(this.props.selected);

		ev.preventDefault();
		ev.stopPropagation();

	},
	storypartDestroyer(){

		var toBeBlownUp = [];


		if(!this.props.selected.children){
			if(confirm("Vill du verkligen radera historiadelen med titel "+this.props.selected.title+" ?")){
				toBeBlownUp.push(this.props.selected.key);

				actions.destroyStoryPart(toBeBlownUp);
			}
		} else {

			alert("Du kan inte ta bort en historiedel som har barn, ta bort barnen först!");

			// if(confirm("VARNING! Historiedelen du vill radera har barn som också kommer att raderas, är du säker på att du vill det?")){
			// 	toBeBlownUp.push(this.props.selected.key);
			//
			// 	_.forEach(this.props.selected.children, function(c){
			// 		_.find(this.props.stories, function(k){return k.key === c.key;});
			// 	});
			//
			// 	actions.destroyStoryPart(toBeBlownUp);
			//
			// }
		}

		console.log("DESTROY!!"+this.props.selected.title);
	},
	render() {
		// var children = this.props.parent.children ? "har barn" : "";
		//
		// if(this.props.parent.children){
		// 	_.map(this.props.parent.children, function(n){
		// 		return <ChildNode key={n.key} data={n} />;
		// 	});
		// }


		var button = this.props.selected.isEnding ? "" : <button className="btn btn-default" onClick={this.clickSelect}>Lägg till fortsättning</button>;

		return (
			<div onClick={this.clickSelect} >
				<div className="panel panel-default story-part">
					<div className="panel-heading">
						<h3 className="panel-title">{this.props.selected.title} <button onClick={this.storypartDestroyer} className="btn btn-xs btn-danger pull-right">X</button></h3>
					</div>
					<div className="panel-body">
						<p>{this.props.selected.txt}</p>
						{button}
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
