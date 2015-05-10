var Reflux = require('reflux'),
    //_ = require('lodash'),
    actions = require('../actions'),
    Firebase = require('firebase');

var storiesRef = new Firebase("https://blazing-fire-8429.firebaseio.com/stories/");

module.exports = Reflux.createStore({
    init(){
      storiesRef.on("value", this.updateStories.bind(this));

      storiesRef.on("child_removed", this.updateStories.bind(this));



      this.listenTo(actions.addStoryPart, this.onAddStoryPart.bind(this));
      this.listenTo(actions.changeSelected, this.onChangeSelected.bind(this));
      this.listenTo(actions.changeFocus, this.onChangeFocus.bind(this));
      this.listenTo(actions.destroyStoryPart, this.onDestroyStoryPart.bind(this));
      this.listenTo(actions.destroyStoryParts, this.onDestroyStoryParts.bind(this));
    },
    onAddStoryPart(storyPart){
      if (storyPart.parentKey) { // If the storypart is a child..
        //var parent = storiesRef.child(storyPart.parentKey).child("children"); // gets reference to the children-field of parent-node

        var newChild = storiesRef.push({ // Creates new post for child-node
            title: storyPart.title,
            txt: storyPart.txt,
            isEnding: storyPart.isEnding
        });
        newChild.update({ // Adds the key to the newly created child-node
          key: newChild.key()
        });

        var parent = storiesRef.child(storyPart.parentKey).child("children").child(newChild.key());

        parent.set({ // And to the child-field of the parent
          key: newChild.key()
        });

      } else { // if it isn't a child, then it's a parent - congrats!

        var newParent = storiesRef.push({  // Adds new post
            title: storyPart.title,
            txt: storyPart.txt,
            isEnding: storyPart.isEnding,
            isParent: true
        });
        newParent.update({ // Attaches key to key-field
          key: newParent.key()
        });

      }
  },
  onDestroyStoryPart(key, parentKey){

    var storyRef = storiesRef.child(key);

    var parentRef = parentKey === "" ? "" : storiesRef.child(parentKey.toString()).child("children").child(key);

    storyRef.remove(function(error){
      if (error) {
        console.log(error);
      } else {
        console.log("Successfully destroyed storypart with key: "+key);

        if (parentKey !== ""){
          parentRef.remove(function(error){
            if (error) {
              console.log(error.code);
            } else {
              console.log("Destroyed children-field on parent.");
            }
          });
        }
      }
    });


  },
  onDestroyStoryParts(array, parentKey){
    array.forEach(function(key){
      actions.destroyStoryPart(key, parentKey);
    });
  },
  onChangeSelected(selected){
    this.trigger({selected: selected});
  },
  resetSelected(){
    this.trigger({selected:{}, focus: {}});
  },
  onChangeFocus(focus, title){

    this.trigger({focus: focus, h3: title});
  },
  updateSelected(snap){
    this.trigger({selected:(this.last = snap.val() || {})});
  },
  updateStories(snap){
    this.trigger({stories:(this.last = snap.val() || {})});
  },
  getDefaultData(){
    var stories;

    storiesRef.on("value", function(snap){
      stories = snap.val();
    });

    return stories || {};
  }
});
