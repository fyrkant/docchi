var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var Wrap = require('./components/wrap');
var MultiRoute = require('./components/multiroute');
var WriteHome = require('./components/writehome');
var WriteNodePage = require('./components/writenodepage');
var ReadHome = require('./components/readhome');
var ReadNodePage = require('./components/readnodepage');
var Home = require('./components/home');

module.exports = (
	<Route path="/" handler={Wrap}>
    <DefaultRoute name="home" handler={Home} />
    <Route name="write" path="write" handler={MultiRoute}>
      <Route name="writenodepage" path=":key" handler={WriteNodePage} />
      <DefaultRoute handler={WriteHome} />
    </Route>
    <Route name="read" path="read" handler={MultiRoute}>
      <Route name="readnodes" path=":key" handler={ReadNodePage} ignoreScrollBehavior>
        <Route name="choicenodes" path=":choice" handler={ReadNodePage} ignoreScrollBehavior />
      </Route>
      <DefaultRoute handler={ReadHome} />
    </Route>
	</Route>
);
