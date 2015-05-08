var React = require('react'),
		_ = require('lodash'),
		Reflux = require('reflux'),
		WriteStore = require('../stores/writestore'),
		actions = require('../actions');

var StoryNode = React.createClass({
	mixins:[Reflux.connect(WriteStore)],
	handleClick:function(evt){
		this.props.handleClick(evt.target.textContent);
	},
	toggleIsChild: function(ev){
		// if (this.props.data.children) {
		// 	console.log(this.props.data.key);
		// }
		//
		if(this.props.data.isParent){
			this.props.handleClick(this.props.data.key);
		} else {
			this.props.onClick();
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


		var button = this.props.data.isEnding ? "" : <button className="btn btn-default" onClick={this.toggleIsChild}>Lägg till fortsättning</button>;

		var data = _.find(this.props.stories, function(s){return s.key === this.props.data.key;}.bind(this));

		return (
			<div className="col-sm-4">
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title">{data.title}</h3>
					</div>
					<div className="panel-body">
						<p >{data.txt}</p>
						{button}
					</div>
				</div>
				{_.map(this.props.data.children, function(n){
					return <StoryNode key={n.key} data={_.find(this.props.stories, function(s){return s.key === n.key;})} stories={this.props.stories} onClick={this.props.onClick} />;
				}.bind(this))}
			</div>
			);
	}

});

module.exports = StoryNode;
