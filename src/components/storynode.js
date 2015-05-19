var React = require('react/addons'),
		_ = require('lodash'),
		// Accordion = require('./accordion'),
		actions = require('../actions');

var StoryNode = React.createClass({
	mixins:[React.addons.LinkedStateMixin],
	getInitialState() {
		return {};
	},
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
	showNode(ev){
		ev.target.nextSibling.classList.toggle('hide');

		ev.preventDefault();
	},
	handleEditStart(evt){
		evt.preventDefault();

		this.setState({
			isEditing: true,
			editValue: this.props.selected.txt
		}, function(){
			this.refs.editInput.getDOMNode().focus();
		});
	},
	handleValueChange(evt){
		var text = this.state.editValue;

		if (evt.which === 13 && text) {
			this.refs.editInput.getDOMNode().blur();
		}
		else if (evt.which === 27) {
			this.setState({isEditing: false}, function(){
				this.refs.editInput.getDOMNode().blur();
			});
		}
	},
	handleBlur(){
		var text = this.state.editValue;

		if (this.state.isEditing && text) {
			actions.editStoryPartText(this.props.selected.key, text);
		}

		this.setState({isEditing: false});
	},
	render() {

		var editingClass = React.addons.classSet({'editing': this.state.isEditing});

		return !this.props.selected ? <div /> : (
			<ul className="tree">
				<li className={editingClass}>
					<a href="#" onClick={this.showNode}>{this.props.selected.title}</a>
					<div className={"hide story-node"}>
						<label className="view" onDoubleClick={this.handleEditStart}>{this.props.selected.txt}</label>

						<textarea ref="editInput"
							className="edit"
							valueLink={this.linkState('editValue')}
							onKeyUp={this.handleValueChange}
							onBlur={this.handleBlur} />

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
