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
                  <a onClick={this.handleClick.bind(this, story.key)}>
                          {story.title}
                  </a>
              </li>;
  		};
      return <ul className="submenu">{_.map(_.filter(this.props.stories, function(s){return s.isParent;}), createItem)}</ul>;

  }

});

module.exports = StoryList;
