var React = require('react');


var WriteOld = React.createClass({
  componentDidMount: function() {
    var key = this.props;

    console.log(key);
  },
	render() {

		//console.log(this.props.params.id);

		//var storyNodeClass = _.isEmpty(this.state.selected) ? "hide" : "";

		//var selectedStory = _.find(this.props.stories, function(story){ return story.key === this.props.key; }.bind(this));

		return (
		<div>
			phello
		</div>
		);
	}
});

module.exports = WriteOld;
