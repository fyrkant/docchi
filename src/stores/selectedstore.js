var Reflux = require('reflux'),
    actions = require('../actions'),
    Firebase = require('firebase');


var selectedRef = new Firebase("https://blazing-fire-8429.firebaseio.com/selected");

module.exports = Reflux.createStore({
    init(){
      selectedRef.on("value", this.updateSelected.bind(this));

      this.listenTo(actions.changeSelected, this.onChangeSelected.bind(this));
    },
  onChangeSelected(selected){
    selectedRef.set({
      title: selected.title,
      txt: selected.txt,
      key: selected.key,
      isEnding: selected.isEnding,
      isParent: selected.isParent
    });
  },
  updateSelected(snap){
    this.trigger((this.last = snap.val() || {}));
  },
  updateStories(snap){
    this.trigger({stories: (this.last = snap.val() || {})});
  },
  getDefaultData(){
    return this.last || {};
  }
});
