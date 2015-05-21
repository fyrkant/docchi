var React = require('react');
var Reflux = require('reflux');
var WriteStore = require('../stores/writestore');
var Router = require('react-router');
var Stories = require('./stories');
var _ = require('lodash');
// var actions = require('../actions');

var NodePage = React.createClass({
  mixins: [Reflux.connect(WriteStore), Router.State],
  getInitialState() {
    return {
      current: '',
      stories: ''
    };
  },
  componentWillMount() {
    this.setState({
      current: this.context.router.getCurrentParams().key
    });
  },
  render() {

    console.log(this.state.current);
    console.log(this.state.stories);
    console.log(_.find(this.state.stories, function(s) { return s.key === this.state.current;}.bind(this)));

    return (
			<div><Stories /></div>
		);
  }
});

module.exports = NodePage;
