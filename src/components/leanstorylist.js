var React = require('react');
var _ = require('lodash');
var Link = require('react-router').Link;

var LeanStoryList = React.createClass({
  render: function() {
    var createItem = (story, index) => {
      if (this.props.isWriteList) {
        if (story.status === this.props.filter && story.author.uid === this.props.user.uid) {
          return (
            <li key={index} index={index}>
              <Link to={this.props.linkTo} params={{key: index}}>
                {_.result(_.find(story.stories, {isParent:true}), 'title')}
              </Link>
            </li>);
        }
      } else {
        return (
          <h3 key={index} index={index}>
            <Link to={this.props.linkTo} params={{key: index}}>
              {_.result(_.find(story.stories, {isParent:true}), 'title')}
              <p>av {story.author.name}</p>
            </Link>
          </h3>);
      }
    };

    var stories = this.props.isWriteList ? this.props.stories : this.props.finishedStories;

    var filter = this.props.user && this.props.isWriteList ? {status: this.props.filter, author: {uid: this.props.user.uid}} : {status: this.props.filter};

    var divClass = !_.find(stories, filter) ? 'hide' : '';

    return (
      <div className={divClass}>
        <h2>{this.props.titleText}</h2>
        {this.props.isWriteList ? <ul>{_.map(stories, createItem)}</ul> : <div>{_.map(stories, createItem)}</div>}
      </div>);

  }

});

module.exports = LeanStoryList;
