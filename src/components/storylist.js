var React = require('react'),
    _ = require('lodash'),
    actions = require('../actions');

var StoryList = React.createClass({
  handleClick:function(key){
    var foundSelected = _.find(this.props.stories, function(s){return s.key === key;});

		actions.changeSelected(foundSelected);
  },
  render: function() {
      var createItem = (story, index) => {
        return <li key={index} index={index}>
                  <button className="btn btn-xs btn-default"
                          onClick={this.handleClick.bind(this, story.key)}>
                          {story.title}
                  </button>
              </li>;
  		};
      return <ul>{_.map(_.filter(this.props.stories, function(s){return s.isParent;}), createItem)}</ul>;

  }

});

module.exports = StoryList;
