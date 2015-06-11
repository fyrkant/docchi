var Reflux = require('reflux');
var actions = require('../actions');

module.exports = Reflux.createStore({
  init() {
    this.listenTo(actions.popMessage, this.onPopMessage.bind(this));
  },
  onPopMessage(message) {
    this.trigger(message);
  }
});
