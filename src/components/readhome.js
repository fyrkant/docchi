var React = require('react');
var LeanStoryList = require('./leanstorylist');

var ReadHome = React.createClass({

  render: function() {
    return (
      <div>
        <LeanStoryList {...this.props} titleText="Färdigställda historier " filter="done" linkTo="readnodes" />
      </div>
    );
  }

});

module.exports = ReadHome;