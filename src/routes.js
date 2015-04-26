/** @jsx React.DOM */

var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    App = require('./app'),
    TodoApp = require('./components/todoapp'),
    Test2 = require('./components/test2');

module.exports = (
	<Route name="app" path="/" handler={App}>
		<Route name="todoapp" handler={TodoApp} />
		<Route name="test2" handler={Test2} />
		<DefaultRoute handler={TodoApp} />
	</Route>
);