// var Reflux = require('reflux');
// var actions = require('../actions');

// module.exports = Reflux.createStore({
//   init() {
//     this.listenTo(actions.unpublish, this.onUnpublish.bind(this));
//   },
//   updateStories(snap) {

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

//     this.trigger(this.last = snap.val() || {});
//   },
//   onUnpublish(key) {
//     var unpublishedRef =  finishedStoriesRef.child(key);
//     unpublishedRef.remove();
//   },
//   getDefaultData() {

//     console.log('default data');

//     var stories;

//     finishedStoriesRef.on('value', function(snap) {
//       stories = snap.val();
//     });

//     return stories || {};
//   }
// });
