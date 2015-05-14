var React = require('react'),
	Router = require('react-router'),
	Link = Router.Link,
	RouteHandler = Router.RouteHandler,
	$ = require('jquery'),
	LoginButton = require('./components/loginbutton');

var App = React.createClass({
	componentDidMount(){
		var menuToggle = $('#js-centered-navigation-mobile-menu').unbind();
	  $('#js-centered-navigation-menu').removeClass("show");

	  menuToggle.on('click', function(e) {
	    e.preventDefault();
	    $('#js-centered-navigation-menu').slideToggle(function(){
	      if($('#js-centered-navigation-menu').is(':hidden')) {
	        $('#js-centered-navigation-menu').removeAttr('style');
	      }
	    });
	  });
	},
	render() {
		var btnClass = ""; // "btn btn-default navbar-btn";
		return (
			<div className="container stretch">
				<header className="centered-navigation" role="banner">
				  <div className="centered-navigation-wrapper">
						<a href="#" className="mobile-logo">
				      <img src="https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/placeholder_logo_3_dark.png" alt="Logo image" />
				    </a>
				    <a href="#" id="js-centered-navigation-mobile-menu" className="centered-navigation-mobile-menu">MENU</a>
				    <nav role="navigation">
				      <ul id="js-centered-navigation-menu" className="centered-navigation-menu show">
				        <li className="nav-link"><Link className={btnClass} to="todoapp">TodoApp</Link></li>
				        <li className="nav-link"><Link className={btnClass} to="lorempage">LoremPage</Link></li>
								<li className="nav-link logo">
				          <a href="#" className="logo">
				            <img src="https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/placeholder_logo_3_dark.png" alt="Logo image" />
				          </a>
				        </li>
				        <li className="nav-link"><Link className={btnClass} to="write">Write</Link></li>
							  <li className="nav-link"><LoginButton /></li>
				      </ul>
				    </nav>
				  </div>
				</header>
				<RouteHandler />
			</div>
		);
	}

});

module.exports = App;
