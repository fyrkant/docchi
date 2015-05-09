var React = require('react'),
		_ = require('lodash'),
		actions = require('../actions');

var StoryNode = React.createClass({
	data: {},
	handleClick:function(evt){
		this.props.handleClick(evt.target.textContent);
	},
	clickSelect: function(ev){

		if(this.props.selected.isParent){
			actions.changeFocus(this.props.selected, false);
		} else {
			actions.changeFocus(this.props.selected, true);
		}

		ev.preventDefault();
		ev.stopPropagation();

	},
	render: function() {
		// var children = this.props.parent.children ? "har barn" : "";
		//
		// if(this.props.parent.children){
		// 	_.map(this.props.parent.children, function(n){
		// 		return <ChildNode key={n.key} data={n} />;
		// 	});
		// }


		var button = this.props.selected.isEnding ? "" : <button className="btn btn-default" onClick={this.clickSelect}>Lägg till fortsättning</button>;

		return (
			<div className="col-sm-4">
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title">{this.props.selected.title}</h3>
					</div>
					<div className="panel-body">
						<p>{this.props.selected.txt}</p>
						{button}
					</div>
				</div>
				{_.map(this.props.selected.children, function(n){
					return <StoryNode key={n.key} stories={this.props.stories} selected={_.find(this.props.stories, function(s){return s.key === n.key;})} />;
				}.bind(this))}
			</div>
			);
	}

});

module.exports = StoryNode;
