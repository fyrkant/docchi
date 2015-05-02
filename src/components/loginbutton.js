var React = require('react'),
	Reflux = require('reflux'),
	LoginStore = require('../stores/loginstore'),
	actions = require('../actions');

var LoginButton = React.createClass({
	mixins:[Reflux.connect(LoginStore)],
	render: function() {
		return (
			<button className="btn btn-default navbar-btn" onClick={actions.login}>Logga in</button>
		);
	}

});

module.exports = LoginButton;