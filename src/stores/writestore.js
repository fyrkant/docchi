var Reflux = require('reflux'),
    actions = require('../actions'),
    Firebase = require('firebase');

var firebaseRef = new Firebase("https://blazing-fire-8429.firebaseio.com/storyparts/");

//var storiesRef = new Firebase("https://blazing-fire-8429.firebaseio.com/stories/");

module.exports = Reflux.createStore({
    listenables: [actions],
    getInitialState:function(){
  		return {
  			h3:"ny historia",
  			stories: {},
  			storyParts:{
          selected:{}
        },
  			selected:{},
  			isChild: false};
  	},
    init:function(){
      firebaseRef.on("value", function(){
        //forceUpdate();
      }, function(error){
        console.log(error.code);
      });

    },
    onAddStoryPart:function(storyPart, isChild){

      if (isChild) {

        var parent = firebaseRef.child(storyPart.key).child("children");

        var newChild = firebaseRef.push({
    				title: storyPart.title,
    				txt: storyPart.txt,
    				isEnding: storyPart.isEnding
    		});
    		newChild.update({
    			key: newChild.key()
    		});

        parent.push({
          key: newChild.key()
        });
      } else {
      var newParent = firebaseRef.push({
  				title: storyPart.title,
  				txt: storyPart.txt,
  				isEnding: storyPart.isEnding,
          isParent: true
  		});
  		newParent.update({
  			key: newParent.key()
  		});
    }
  }
});
