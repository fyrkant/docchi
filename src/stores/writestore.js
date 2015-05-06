var Reflux = require('reflux'),
    actions = require('../actions'),
    Firebase = require('firebase');

var firebaseRef = new Firebase("https://blazing-fire-8429.firebaseio.com/storyparts/");

module.exports = Reflux.createStore({
    listenables: [actions],
    init:function(){

    },
    onAddStoryPart:function(storyPart){
      var newEntry = firebaseRef.push({
  				parent: storyPart.parent,
  				title: storyPart.title,
  				txt: storyPart.txt,
  				children: storyPart.children,
  				isEnding: storyPart.isEnding
  		});

  		newEntry.update({
  			key: newEntry.key()
  		});
    },
    onGetParent:function(){
      console.log("hey");
      var parent = {title: "TITEL!", txt: "TEXT!"};
      return parent;
    }

});
