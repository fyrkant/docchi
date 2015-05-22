var React = require('react');
// var Router = require('react-router');
var Stories = require('./stories');
var _ = require('lodash');
// var actions = require('../actions');

var NodePage = React.createClass({
  // componentDidMount() {

  //   console.log(this.props.params.key);
  //   console.log(this.props.stories);

  //   var filteredStories = _.find(this.props.stories, {key: this.props.params.key}, 'stories');

  //   console.log(filteredStories);

  // },
  render() {

    var foundStories = _.result(_.find(this.props.stories, {key: this.props.params.key}), 'stories');
    var foundParent = _.find(foundStories, {isParent: true});

    return (
			<div><Stories data={foundStories} selected={foundParent} /></div>
		);
  }
});

module.exports = NodePage;
