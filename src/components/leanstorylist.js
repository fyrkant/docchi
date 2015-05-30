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
              {!this.props.isWriteList ? '- ' + story.author.name : ''}
            </Link>
          </li>);
      }
    };

    var stories = this.props.isWriteList ? this.props.stories : this.props.finishedStories;

    var filter = this.props.user && this.props.isWriteList ? {status: this.props.filter, author: {uid: this.props.user.uid}} : {status: this.props.filter};

    var divClass = !_.find(stories, filter) ? 'hide' : '';

    return (
      <div className={divClass}>
        <h2>
        {this.props.titleText +
          ' (' + _.toArray(_.filter(stories, filter)).length + ')'}</h2>
        <ul>{_.map(stories, createItem)}</ul>
      </div>);

  }

});

module.exports = LeanStoryList;
