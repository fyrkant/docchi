var React = require('react');
// var Router = require('react-router');
var WriteNode = require('./writenode');
var _ = require('lodash');
// var actions = require('../actions');

var WriteNodePage = React.createClass({
  render() {

    var foundStories = _.result(_.find(this.props.stories, {key: this.props.params.key}), 'stories');
    var foundParent = _.find(foundStories, {isParent: true});

    return (
			<div><WriteNode data={foundStories} selected={foundParent} /></div>
		);
  }
});

module.exports = WriteNodePage;
