var React = require('react/addons');
var actions = require('../actions');

var PopMessage = React.createClass({
  handleClick() {
    actions.popMessage('test');
  },
  render() {
    return <button onClick={this.handleClick}>KLICKA HÄR!</button>;
  }
});

module.exports = PopMessage;
