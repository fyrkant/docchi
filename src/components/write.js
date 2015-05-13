var React = require('react'),
		Reflux = require('reflux'),
		DocchiStore = require('../stores/docchistore'),
		_ = require('lodash'),
		$ = require('jquery'),
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
		$('.js-accordion-trigger').bind('click', function(e){
		  $(this).parent().find('.submenu').toggle('fold');  // apply the toggle to the ul
		  $(this).parent().toggleClass('is-expanded');
		  e.preventDefault();
		});

	},
	render() {
		var storyListClass = _.isEmpty(_.filter(this.state.stories, function(s){return s.isParent;})) ? "hide" : "story-list";

		var storyNodeClass = _.isEmpty(this.state.selected) ? "hide" : "tree";

		//var activated = storyNodeClass !== "tree" && _.isEmpty(this.state.focus) ? true : false;

		return (
		<div>
				<WriterForm focus={this.state.focus} h3={this.state.h3} />


				<div className={storyListClass}>
					<ul className="accordion">
						<li>
							<StoryList stories={this.state.stories} />
							<button href="#" className="js-accordion-trigger">Visa redan påbörjade</button>
						</li>
					</ul>
				</div>

			<div className={storyNodeClass}>
				<StoryNode key={this.state.selected.key} stories={this.state.stories} selected={this.state.selected} />
			</div>
		</div>
		);
	}
});

module.exports = WriteApp;
