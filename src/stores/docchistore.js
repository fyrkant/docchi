var Reflux = require('reflux'),
    actions = require('../actions'),
    Firebase = require('firebase');

var storiesRef = new Firebase("https://blazing-fire-8429.firebaseio.com/stories/");

module.exports = Reflux.createStore({
    init(){
      storiesRef.on("value", this.updateStories.bind(this));

      this.listenTo(actions.addStoryPart, this.onAddStoryPart.bind(this));
      this.listenTo(actions.changeSelected, this.onChangeSelected.bind(this));
      this.listenTo(actions.changeFocus, this.onChangeFocus.bind(this));
    },
    onAddStoryPart(storyPart){
      if (storyPart.parentKey) { // If the storypart is a child..
        var parent = storiesRef.child(storyPart.parentKey).child("children"); // gets reference to the children-field of parent-node

        var newChild = storiesRef.push({ // Creates new post for child-node
            title: storyPart.title,
            txt: storyPart.txt,
            isEnding: storyPart.isEnding
        });
        newChild.update({ // Adds the key to the newly created child-node
          key: newChild.key()
        });

        parent.push({ // And to the child-field of the parent
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
  onChangeSelected(selected){
    this.trigger({selected: selected});
  },
  onChangeFocus(focus){
    this.trigger({focus: focus, h3: "fortsättning på "+focus.title});
  },
  updateStories(snap){
    this.trigger({stories:(this.last = snap.val() || {})});
  },
  getDefaultData(){
    return this.last || {};
  }
});
