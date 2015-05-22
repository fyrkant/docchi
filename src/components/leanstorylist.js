var React = require('react');
var _ = require('lodash');
var actions = require('../actions');
var Link = require('react-router').Link;

var LeanStoryList = React.createClass({
  getInitialState() {
    return {};
  },
  handleClick:function(key) {
    var foundSelected = _.find(this.props.stories, function(s) {return s.key === key;});

    actions.changeSelected(foundSelected);
  },
  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps);

  //   this.setState({list: nextProps.stories});

  // },
  render: function() {

    // var storyCount = _.toArray(_.filter(this.props.stories, function(s){return s.isParent;})).length;
    // var btnTxt = storyCount === 1 ? "oavslutad" : "oavslutade";
    //
    // var triggerText = storyCount + " " + btnTxt;

    var createItem = (story, index) => {

      var key = story.key;

      return (<li key={index} index={index}><Link to="Nodes" params={{key: key}}>{story.title}</Link></li>);
    };
    return (
      <div className="list-unfinished">
        <h2>Lista på oavslutade:</h2>
        <ul>{_.map(this.props.stories, createItem)}</ul>
      </div>);

  }

});

module.exports = LeanStoryList;
