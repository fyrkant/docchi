var React = require('react');
var Reflux = require('reflux');
var LoginStore = require('../stores/loginstore');
var actions = require('../actions');

var LoginButton = React.createClass({
  mixins:[Reflux.connect(LoginStore)],
  render: function() {
    return (
			<button onClick={actions.login}>Logga in</button>
		);
  }
});

module.exports = LoginButton;
