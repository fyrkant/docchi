var React = require('react');
var actions = require('../actions');
var Router = require('react-router');

var LoginButton = React.createClass({
  mixins: [Router.Navigation],
  handleLogout(evt) {
    evt.preventDefault();
    actions.logout();
    this.replaceWith('home');
  },
  render: function() {
    return this.props.user ?
      <span><p>Inloggad som <em>{this.props.user.name}</em></p><a onClick={this.handleLogout}>Logga ut</a></span>
      : <a onClick={actions.login}>Logga in med <i className="fa fa-github"></i></a>;
  }
});

module.exports = LoginButton;
