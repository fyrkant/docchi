var Reflux = require('reflux'),
    actions = require('./actions');
    /*Firebase = require('firebase');

var myFirebase = new Firebase("https://blazing-fire-8429.firebaseio.com/docchi/");*/

module.exports = Reflux.createStore({
    listenables: [actions]    
});
