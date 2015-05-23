var React = require('react');
var _ = require('lodash');
var Link = require('react-router').Link;

var LeanStoryList = React.createClass({
  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps);

  //   this.setState({list: nextProps.stories});

  // },
  render: function() {

    // var storyCount = _.toArray(_.filter(this.props.stories, function(s){return s.isParent;})).length;
    // var btnTxt = storyCount === 1 ? "oavslutad" : "oavslutade";
    //
    // var triggerText = storyCount + " " + btnTxt;

    var createItem = function(story, index) {
      return (<li key={index} index={index}><Link to="Nodes" params={{key: index}}>{story.title}</Link></li>);
    };
    return (
      <div className="list-unfinished">
        <h2>Lista på oavslutade:</h2>
        <ul>{_.map(this.props.stories, createItem)}</ul>
      </div>);

  }

});

module.exports = LeanStoryList;
