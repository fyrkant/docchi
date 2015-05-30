var Reflux = require('reflux');
var Firebase = require('firebase');
var ref = new Firebase('https://blazing-fire-8429.firebaseio.com');
var actions = require('../actions');

module.exports = Reflux.createStore({
  init() {

    ref.onAuth(function(authData) {
      if (!authData) {
        this.trigger((this.last = false));
      }
    }.bind(this));

    this.listenTo(actions.login, this.onLogin.bind(this));
    this.listenTo(actions.logout, this.onLogout.bind(this));
  },
  getDefaultData() {
    return this.last;
  },
  onLogin(provider) {
    ref.authWithOAuthPopup(provider, function(error, authData) {
      if (error) {
        console.log('Login Failed!', error);
      } else {
        console.log('Authenticated successfully with payload:', authData);
        var user = {
          name: authData[provider].displayName,
          provider: authData.provider,
          uid: authData.uid
        };
        console.log(user);
        this.trigger((this.last = user));
      }
    }.bind(this));
  },
  onLogout() {
    console.log('logging out');
    ref.unauth();
  }
});
