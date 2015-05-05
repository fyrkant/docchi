var Reflux = require('reflux'),
    actions = require('../actions'),
    Firebase = require('firebase');

var firebaseRef = new Firebase("https://blazing-fire-8429.firebaseio.com/storyparts/");

module.exports = Reflux.createStore({
    listenables: [actions],
    onAddStoryPart:function(storyPart){
      var newEntry = firebaseRef.push({
  				parent: "",
  				title: storyPart.title,
  				txt: storyPart.txt,
  				children: {x: "", y: ""},
  				isEnding: storyPart.isEnding
  		});

  		newEntry.update({
  			key: newEntry.key()
  		});
    },
    onSaveStoryPart: function(state){
      console.log("hit");
      console.log(state);
      this.firebaseRefs.storyPart.push({
        storyPart: state.storyPart
      }, function(err){console.log(err);});
      this.setState({storyPart:
  			{
  				key: "",
  				prepart: "",
  				title: "",
  				txt: ""
        }});
    }.bind(this)
});
