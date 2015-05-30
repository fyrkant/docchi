var React = require('react/addons');
var _ = require('lodash');
var ReadNode = require('./readnode');

var ReadNodePage = React.createClass({
  render() {

    var foundStories = _.result(_.find(this.props.finishedStories, {key: this.props.params.key}), 'stories');
    var foundParent = _.find(foundStories, {isParent: true});

    return (
			<div className="write-home"><ReadNode {...this.props} data={foundStories} selected={foundParent} key={this.props.params.key} /></div>
		);
  }
});

module.exports = ReadNodePage;
