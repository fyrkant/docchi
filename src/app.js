var React = require('react'),
	Router = require('react-router'),
	Link = Router.Link,
	RouteHandler = Router.RouteHandler;

var App = React.createClass({

	render: function() {
		return (
			<div className="container">
				<div className="row">
					<div className="nav nav-pills">
						<Link className="btn btn-default" to="todoapp">TodoApp</Link>
						<Link className="btn btn-default" to="lorempage">LoremPage</Link>
						<Link className="btn btn-default" to="write">Write</Link>
					</div>

					<RouteHandler />
				</div>
			</div>
		);
	}

});

module.exports = App;
