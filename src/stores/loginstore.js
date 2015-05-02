var Reflux = require('reflux'),
	Firebase = require('firebase'),
	ref = new Firebase("https://blazing-fire-8429.firebaseio.com"),
	actions = require('../actions');

module.exports = Reflux.createStore({
	listenables: [actions],
	onLogin: function(){
		ref.authWithOAuthPopup("github", function(error, authData) {
		  if (error) {
		    console.log("Login Failed!", error);
		  } else {
		    console.log("Authenticated successfully with payload:", authData);
		  }
		});
	}
});


