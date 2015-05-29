var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
// var TodoApp = require('./components/todoapp');
// var LoremPage = require('./components/lorempage');
// var Write = require('./components/write');
//var StoryNode = require('./components/storynode');
//var Wrapper = require('./components/wrapper');
var Wrap = require('./components/wrap');
var MultiRoute = require('./components/multiroute');
var WriteHome = require('./components/writehome');
var WriteNodePage = require('./components/writenodepage');
var ReadHome = require('./components/readhome');
var ReadNodePage = require('./components/readnodepage');

module.exports = (
	<Route path="/" handler={Wrap}>
    <Route name="write" path="write" handler={MultiRoute}>
      <Route name="writenodepage" path=":key" handler={WriteNodePage} />
      <DefaultRoute handler={WriteHome} />
    </Route>
    <Route name="read" path="read" handler={MultiRoute}>
      <Route name="readnodes" path=":key" handler={ReadNodePage}>
        <Route name="choicenodes" path=":choice" handler={ReadNodePage} />
      </Route>
      <DefaultRoute handler={ReadHome} />
    </Route>
	</Route>
);
