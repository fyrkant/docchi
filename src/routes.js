var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
// var TodoApp = require('./components/todoapp');
// var LoremPage = require('./components/lorempage');
// var Write = require('./components/write');
//var StoryNode = require('./components/storynode');
//var Wrapper = require('./components/wrapper');
var Home = require('./components/home');
var Read = require('./components/read');
var WriteBeta = require('./components/write-d');
var NodePage = require('./components/nodepage');
var LeanStoryList = require('./components/leanstorylist');
var BetaWriter = require('./components/beta-form');
var WriteHome = require('./components/writehome');

module.exports = (
	<Route handler={Home}>

    <DefaultRoute handler={WriteBeta} />
    {/*<Route name="write" path="write" handler={Write}>
          <Route name="writeNew" path="new" handler={Write} />
          <Route name="writeOld" path=":key" handler={Write} />
          <DefaultRoute handler={Write} />
        </Route>*/}
    <Route name="beta" path="beta" handler={WriteBeta}>
      <Route name="WriteNew" path="new" handler={BetaWriter} />
      <Route name="List" path="list" handler={LeanStoryList} />
      <Route name="Nodes" path=":key" handler={NodePage} />
      <DefaultRoute handler={WriteHome} />
    </Route>
    <Route name="read" path="read" handler={Read} />
	</Route>
);
