var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    App = require('./app'),
    TodoApp = require('./components/todoapp'),
    LoremPage = require('./components/lorempage');

module.exports = (
	<Route name="app" path="/" handler={App}>
		<Route name="todoapp" handler={TodoApp} />
		<Route name="lorempage" handler={LoremPage} />
		<DefaultRoute handler={TodoApp} />
	</Route>
);
