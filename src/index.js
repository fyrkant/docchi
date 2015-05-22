var React = require('react');
var ReactRouter = require('react-router');
var routes = require('./routes');

ReactRouter.run(routes, function(Handler, state) {
  var params = state.params;
  React.render(<Handler params={params} />, document.body);
});
