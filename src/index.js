var React = require('react'),
		ReactRouter = require('react-router'),
		routes = require('./routes');


ReactRouter.run(routes, function(Handler, state){
	React.render(<Handler params={state.params} />, document.body);
});
