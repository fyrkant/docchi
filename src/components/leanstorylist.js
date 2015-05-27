var React = require('react');
var _ = require('lodash');
var Link = require('react-router').Link;

var LeanStoryList = React.createClass({
  render: function() {
    var createItem = (story, index) => {
      if (story.status === this.props.filter) {
        return (
          <li key={index} index={index}>
            <Link to={this.props.linkTo} params={{key: index}}>
              {_.result(_.find(story.stories, {isParent:true}), 'title')}
            </Link>
          </li>);
      }
    };

    var divClass = !_.find(this.props.stories, {status: this.props.filter}) ? 'hide' : '';

    return (
      <div className={divClass}>
        <h2>
        {this.props.titleText +
          ' (' + _.toArray(_.filter(this.props.stories, {status: this.props.filter})).length + ')'}</h2>
        <ul>{_.map(this.props.stories, createItem)}</ul>
      </div>);

  }

});

module.exports = LeanStoryList;
