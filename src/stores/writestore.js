var Reflux = require('reflux');
var actions = require('../actions');
var Firebase = require('firebase');
var _ = require('lodash');

var storiesRef = new Firebase('https://blazing-fire-8429.firebaseio.com/stories/writing');

module.exports = Reflux.createStore({
  init() {
    storiesRef.on('value', this.updateStories.bind(this));
    storiesRef.on('child_changed', this.childChanged.bind(this));
    storiesRef.on('child_removed', this.childRemoved.bind(this));

    this.listenTo(actions.addStoryStart, this.onAddStoryStart.bind(this));
    this.listenTo(actions.editStoryPart, this.onEditStoryPart.bind(this));
    this.listenTo(actions.destroyStoryPart, this.onDestroyStoryPart.bind(this));
    this.listenTo(actions.destroyStoryParts, this.onDestroyStoryParts.bind(this));
    this.listenTo(actions.addStoryPart, this.onAddStoryPart.bind(this));
    this.listenTo(actions.setStatus, this.onSetStatus.bind(this));
  },
  onAddStoryPart(storyPart) {

    // console.log(storyPart);

    var containerKey = storyPart.parentKey.split('/');
    // console.log(containerKey);

    var newChild = storiesRef.child(containerKey[0] + '/' + containerKey[1]).push({
      title: storyPart.title,
      txt: storyPart.txt,
      isEnding: storyPart.isEnding
    });

    var concatKey = containerKey[0] + '/stories/' + newChild.key();

    newChild.update({
      key: concatKey
    });

    var parent = storiesRef.child(storyPart.parentKey).child('children').child(newChild.key());

    parent.set({
      key: concatKey
    });
  },
  onAddStoryStart(storyStart, user) {

    var container = storiesRef.push({
      title: storyStart.title,
      status: 'writing',
      author: user
    });
    container.update({
      key: container.key()
    });

    // var containerPush = storiesRef.child(container.key());

    var newParent = container.child('stories').push({  // Adds new post
      title: storyStart.title,
      txt: storyStart.txt,
      isParent: true
    });

    newParent.update({ // Attaches key to key-field
      key: container.key() + '/stories/' + newParent.key()
    });
  },
  onEditStoryPart(key, edited) {

    // console.log(key);

    var thatStoryPartRef = storiesRef.child(key);

    thatStoryPartRef.update({
      title:edited.title,
      txt: edited.txt,
      isEnding: edited.isEnding
    });

  },
  onDestroyStoryPart(key, parentKey, last) {

    var splat = key.split('/');

    var storyRef = storiesRef.child(key);

    var parentRef = parentKey === '' ? '' : storiesRef.child(parentKey.toString()).child('children').child(splat[2]);

    storyRef.remove(function(error) {
      if (error) {
        console.log(error);
      } else {
        console.log('Successfully destroyed storypart with key: ' + key);

        if (parentKey !== '') {
          parentRef.remove(function(error) {
            if (error) {
              console.log(error.code);
            } else {
              console.log('Destroyed children-field on parent.');
            }
          });
        }
      }
    });

    if (parentKey === '' && last) {

      var containerRef = storiesRef.child(splat[0]);
      containerRef.remove(function(error) {
        if (error) {
          console.log(error);
        } else {
          console.log('Successfully destroyed container.');
        }
      });

    }
  },
  onDestroyStoryParts(array, parentKey) {
    array.forEach(function(key, index, array) {
      actions.destroyStoryPart(key, parentKey, index === (array.length - 1));
    });
  },
  onSetStatus(key, status) {
    var exists;
    storiesRef.child(key).once('value', function(snapshot) {
      exists = (snapshot.val() !== null);
    }, function() {
      exists = false;
    });

    if (exists) {
      storiesRef.child(key).update({
        status: status
      });
    }
  },
  childChanged(snap) {
    var story = snap.val();

    if (story.status === 'done') {
      storiesRef.child(story.key).once('value', function() {
        storiesRef.parent().child('done').child(story.key).set(
          story,
          function(error) { console.log(error);}
          );
      });
    } else if (story.status === 'writing') {
      actions.unpublish(story.key);
    }
  },
  childRemoved(snap) {
    actions.unpublish(snap.val().key);
  },
  updateStories(snap) {
    this.trigger(this.last = snap.val() || {});
  },
  getDefaultData() {

    console.log('default data');

    var stories;

    storiesRef.on('value', function(snap) {
      stories = snap.val();
    });

    return stories || {};
  }
});
