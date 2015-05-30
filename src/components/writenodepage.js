var React = require('react');
var Router = require('react-router');
var WriteNode = require('./writenode');
var _ = require('lodash');
// var actions = require('../actions');

var WriteNodePage = React.createClass({
  mixins:[Router.Navigation],
  componentWillMount() {
    if (!this.props.user) {
      this.replaceWith('home');
    }
  },
  render() {

    var foundStories = _.result(_.find(this.props.stories, {key: this.props.params.key}), 'stories');
    var foundParent = _.find(foundStories, {isParent: true});

    return (
        <section className="writer-wrap">
          <WriteNode {...this.props} data={foundStories} selected={foundParent} />
        </section>);
  }
});

module.exports = WriteNodePage;
