var React = require('react');
var actions = require('../actions');

var LoginButton = React.createClass({
  render: function() {
    return this.props.user ?
      <a className="login" onClick={actions.logout}>Logga ut {this.props.user.name}</a>
      : <a className="login" onClick={actions.login}>Logga in</a>;
  }
});

module.exports = LoginButton;
