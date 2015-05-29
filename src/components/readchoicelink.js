var React = require('react/addons');
var _ = require('lodash');
var marked = require('marked');

var ChoiceLink = React.createClass({
  handleClick(ev) {
    ev.preventDefault();
    ev.stopPropagation();

    this.props.handleChoice(this.props.story);

  },
  render() {
    return <a onClick={this.handleClick}>{this.props.story.title}</a>;
  }
});

module.exports = ChoiceLink;
