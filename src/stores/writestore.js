// var Reflux = require('reflux'),
//     actions = require('../actions'),
//     Firebase = require('firebase');
//
// //var myFirebase = new Firebase("https://blazing-fire-8429.firebaseio.com/storypart/");
//
// module.exports = Reflux.createStore({
//     listenables: [actions],
//     onSaveStoryPart: function(state){
//       console.log("hit");
//       console.log(state);
//       this.firebaseRefs.storyPart.push({
//         storyPart: state.storyPart
//       }, function(err){console.log(err);});
//       this.setState({storyPart:
//   			{
//   				key: "",
//   				prepart: "",
//   				title: "",
//   				txt: ""
//         }});
//     }.bind(this)
// });
