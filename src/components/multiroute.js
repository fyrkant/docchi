var React = require('react/addons');
var Router = require('react-router');

var MultiRoute = React.createClass({

  render() {
    return <Router.RouteHandler {...this.props} />;
  }
});

module.exports = MultiRoute;
