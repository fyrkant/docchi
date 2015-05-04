var React = require('react'),
    _ = require('lodash');

var StoryList = React.createClass({

  render: function() {
      var createItem = (story, index) => {
  			return <li key={index} index={index}>{story.title}</li>;
  		};
      return <ul>{_.map(_.filter(this.props.stories, function(s){return s.parent === "";}), createItem)}</ul>;

  }

});

module.exports = StoryList;
