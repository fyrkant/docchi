var React = require('react');
var actions = require('../actions');
var Router = require('react-router');

var LoginButton = React.createClass({
  mixins: [Router.Navigation],
  handleLogin(evt) {
    evt.preventDefault();
    actions.login(this.props.provider);
  },
  handleLogout(evt) {
    evt.preventDefault();
    actions.logout();
    this.replaceWith('home');
  },
  render: function() {
    return this.props.user ?
      <span className={this.props.user.provider === this.props.provider ? '' : 'hide'}>
        <p>
          Inloggad som <em>{this.props.user.name}</em>
        </p>
        <a onClick={this.handleLogout}>
          Logga ut
        </a>
      </span> :
      <a onClick={this.handleLogin}>
        Logga in med <i className={'fa fa-' + this.props.provider}></i>
      </a>;
  }
});

module.exports = LoginButton;
