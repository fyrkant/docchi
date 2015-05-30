var Reflux = require('reflux');
var Firebase = require('firebase');
var actions = require('../actions');

var finishedStoriesRef = new Firebase('https://blazing-fire-8429.firebaseio.com/stories/done');

module.exports = Reflux.createStore({
  init() {
    finishedStoriesRef.on('value', this.updateStories.bind(this));

    this.listenTo(actions.unpublish, this.onUnpublish.bind(this));
  },
  updateStories(snap) {

    // _.map(snap.val(), function(story) {
    //   if (story.status === 'done') {
    //     finishedStoriesRef.child(story.key).once('value', function() {
    //       finishedStoriesRef.child('done').child(story.key).set(
    //         story,
    //         function(error) { console.log(error);}
    //         );
    //     });
    //   }
    // });

    this.trigger(this.last = snap.val() || {});
  },
  onUnpublish(key) {
    var unpublishedRef =  finishedStoriesRef.child(key);
    unpublishedRef.remove();
  },
  getDefaultData() {

    console.log('default data');

    var stories;

    finishedStoriesRef.on('value', function(snap) {
      stories = snap.val();
    });

    return stories || {};
  }
});
