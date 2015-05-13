var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    App = require('./app'),
    TodoApp = require('./components/todoapp'),
    LoremPage = require('./components/lorempage'),
    Write = require('./components/write');

module.exports = (
	<Route name="app" path="/" handler={App}>
		<Route name="todoapp" handler={TodoApp} />
		<Route name="lorempage" handler={LoremPage} />
    <Route name="write" handler={Write} />
		<DefaultRoute handler={Write} />
	</Route>
);
