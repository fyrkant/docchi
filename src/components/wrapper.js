var React = require('react'),
    Header = require('./header'),
    RouteHandler = require('react-router').RouteHandler;

var Wrapper = React.createClass({
  render() {
    return (
      <div>
        <Header />
        <RouteHandler />          
      </div>
    );
  }

});

module.exports = Wrapper;
