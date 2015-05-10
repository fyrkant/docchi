var React = require('react'),
	Router = require('react-router'),
	Link = Router.Link,
	RouteHandler = Router.RouteHandler,
	LoginButton = require('./components/loginbutton');

var App = React.createClass({

	render: function() {
		var btnClass = "btn btn-default navbar-btn";
		return (
			<div>
				<div className="container">
					<div className="row">
						<div className="nav nav-pills">
							<Link className={btnClass} to="todoapp">TodoApp</Link>
							<Link className={btnClass} to="lorempage">LoremPage</Link>
							<Link className={btnClass} to="write">Write</Link>
							<LoginButton />
						</div>
					</div>
				</div>
				<RouteHandler />
			</div>
		);
	}

});

module.exports = App;
