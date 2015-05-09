// var Reflux = require('reflux'),
//     actions = require('../actions'),
//     Firebase = require('firebase'),
//     ReactFireMixin = require('reactfire');
//
// var firebaseRef = new Firebase("https://blazing-fire-8429.firebaseio.com/storyparts/");
//
// //var storiesRef = new Firebase("https://blazing-fire-8429.firebaseio.com/stories/");
//
// module.exports = Reflux.createStore({
//     mixins:[ReactFireMixin],
//     listenables: [actions],
//     getInitialState:function(){
//   		return {
//   			h3:"ny historia",
//   			stories: {},
//   			storyParts:{
//           selected:{}
//         },
//   			selected:{},
//   			isChild: false};
//   	},
//     init:function(){
//       firebaseRef.on("value", function(){
//         //forceUpdate();
//       }, function(error){
//         console.log(error.code);
//       });
//
//     },
//     onAddStoryPart:function(storyPart, isChild){
//
//       var error = function(error) {
//         if (error) {
//           console.log(error.code);
//         } else {
//           console.log("storypart saved successfully");
//         }
//       }.bind(this);
//
//       if (isChild) { // If the storypart is a child...
//
//         var parent = firebaseRef.child(storyPart.key).child("children"); // gets reference to the children-field of parent-node
//
//         var newChild = firebaseRef.push({ // Creates new post for child-node
//     				title: storyPart.title,
//     				txt: storyPart.txt,
//     				isEnding: storyPart.isEnding
//     		}, function(error) {
//           if (error) {
//             console.log(error.code);
//           } else {
//             console.log("storypart saved successfully");
//           }
//         });
//     		newChild.update({ // Adds the key to the newly created child-node
//     			key: newChild.key()
//     		}, error(error));
//
//         parent.push({ // And to the child-field of the parent
//           key: newChild.key()
//         }, error(error));
//       } else { // If the storypart isn't a child it's a parent! Congrats!
//
//       var newParent = firebaseRef.push({  // Adds new post
//   				title: storyPart.title,
//   				txt: storyPart.txt,
//   				isEnding: storyPart.isEnding,
//           isParent: true
//   		}, error(error));
//   		newParent.update({ // Attaches key to key-field
//   			key: newParent.key()
//   		}, error(error));
//     }
//   }
// });
