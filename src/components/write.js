var React = require('react'),
		Reflux = require('reflux'),
		DocchiStore = require('../stores/docchistore'),
		// $ = require('jquery'),
		_ = require('lodash'),
		StoryNode = require('./storynode'),
		WriterForm = require('./writerform');

require('jquery-ui');

var WriteApp = React.createClass({
	mixins:[Reflux.connect(DocchiStore)],
	getInitialState(){
		return {
			statusWord:"Skriv",
			h3:"Ny historia",
			stories: {},
			selected:{},
			focus:{}
			};
	},
	// componentDidMount(){
  //   $('.js-accordion-trigger').bind('click', function(e){
	// 	  $(this).parent().find('.submenu').toggle('fold');  // apply the toggle to the ul
	// 	  $(this).parent().toggleClass('is-expanded');
	// 		console.log("log");
	// 	  e.preventDefault();
	// 	});
  // },
	render() {

		var storyNodeClass = _.isEmpty(this.state.selected) ? "hide" : "";

		//var activated = storyNodeClass !== "tree" && _.isEmpty(this.state.focus) ? true : false;

		return (
		<div className="stretch">
			<div className={storyNodeClass}>
				<StoryNode key={this.state.selected.key} stories={this.state.stories} selected={this.state.selected} />
			</div>
			<WriterForm focus={this.state.focus} h3={this.state.h3} statusWord={this.state.statusWord} stories={this.state.stories} />
		</div>
		);
	}
});

module.exports = WriteApp;
