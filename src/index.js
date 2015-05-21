var React = require('react');
var ReactRouter = require('react-router');
var routes = require('./routes');

ReactRouter.run(routes, function(Handler, state) {
  React.render(<Handler params={state.params} />, document.body);
});
