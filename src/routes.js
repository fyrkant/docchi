/** @jsx React.DOM */

var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    App = require('./app'),
    Test1 = require('./components/test1'),
    Test2 = require('./components/test2');

module.exports = (
	<Route name="app" path="/" handler={App}>
		<Route name="test1" handler={Test1} />
		<Route name="test2" handler={Test2} />
		<DefaultRoute handler={Test2} />
	</Route>
);