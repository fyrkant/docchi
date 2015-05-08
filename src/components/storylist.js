var React = require('react'),
    _ = require('lodash');

var StoryList = React.createClass({
  handleClick:function(key){
    this.props.handleClick(key);
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
