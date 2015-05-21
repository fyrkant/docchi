var React = require('react');
var _ = require('lodash');
var actions = require('../actions');
var Accordion = require('./accordion');

// var Link = require('react-router').Link;

var StoryList = React.createClass({
  handleClick:function(key) {
    var foundSelected = _.find(this.props.stories, function(s) {return s.key === key;});

    actions.changeSelected(foundSelected);
  },
  render: function() {

    var storyCount = _.toArray(this.props.stories).length;
    var btnTxt = storyCount === 1 ? 'oavslutad' : 'oavslutade';

    var triggerText = storyCount + ' ' + btnTxt;

    var createItem = (story, index) => {
      return <li key={index} index={index}>
                  <a onClick={this.handleClick.bind(this, story.key)}>
                    {story.title}
                  </a>
              </li>;
    };
    return <Accordion triggerText={triggerText}>{_.map(this.props.stories, createItem)}</Accordion>;
  }
});

module.exports = StoryList;
