/** @jsx React.DOM */

var React = require('react'),
	Router = require('react-router'),
	Link = Router.Link,
	Route = Router.Route,
	RouteHandler = Router.RouteHandler;

var App = React.createClass({

	render: function() {
		return (
			<div>
				<ul className="nav nav-pills">
					<li><Link to="test1">Test1</Link></li>
					<li><Link to="test2">Test2</Link></li>
				</ul>

			<RouteHandler />
			</div>
		);
	}

});

module.exports = App;

