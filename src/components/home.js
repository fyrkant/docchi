var React = require('react');
var actions = require('../actions');

var Home = React.createClass({
  render: function() {
    return (
  <div className="write-home">
    <p>
      HEMMA! <a onClick={actions.login}>Logga in</a>
    </p>
  </div>);
  }
});

module.exports = Home;
