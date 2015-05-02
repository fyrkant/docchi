var Reflux = require('reflux'),
    actions = require('../actions'),
    Firebase = require('firebase');

var myFirebase = new Firebase("https://blazing-fire-8429.firebaseio.com/items/");

module.exports = Reflux.createStore({
    listenables: [actions],
    onDeleteTodoLine: function(key) {
        if (confirm("Vill du verkligen radera raden?")) {
            myFirebase.child(key).remove(function (error) {
                if (error) {
                    console.log(error);
                }
            });
        }
    }
});