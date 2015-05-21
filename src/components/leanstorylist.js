var React = require('react');
var _ = require('lodash');
var actions = require('../actions');
var Link = require('react-router').Link;

var LeanStoryList = React.createClass({
  handleClick:function(key) {
    var foundSelected = _.find(this.props.stories, function(s) {return s.key === key;});

    actions.changeSelected(foundSelected);
  },
  render: function() {

    // var storyCount = _.toArray(_.filter(this.props.stories, function(s){return s.isParent;})).length;
    // var btnTxt = storyCount === 1 ? "oavslutad" : "oavslutade";
    //
    // var triggerText = storyCount + " " + btnTxt;

    var createItem = (story, index) => {
      return <li key={index} index={index}>
                                  <Link to="nodes" params={{key:story.key}}>
                                      {story.title}
                                  </Link>
                          </li>;
    };
    return <ul>{_.map(this.props.stories, createItem)}</ul>;

  }

});

module.exports = LeanStoryList;
