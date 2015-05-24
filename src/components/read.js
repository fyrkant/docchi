var React = require('react');
var LeanStoryList = require('./leanstorylist');

var Read = React.createClass({

  render: function() {
    return (
      <div className="write-home">
      	<LeanStoryList {...this.props} titleText="Lista på avslutade" filter="done" linkTo="readnodes" />
      </div>
    );
  }

});

module.exports = Read;
