var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    TodoApp = require('./components/todoapp'),
    LoremPage = require('./components/lorempage'),
    Write = require('./components/write'),
    StoryNode = require('./components/storynode'),
    // Wrapper = require('./components/wrapper'),
    Home = require('./components/home'),
    Read = require('./components/read');

module.exports = (
	<Route handler={Home}>

    <DefaultRoute handler={Write} />

		<Route name="todoapp" path="todo" handler={TodoApp} />
		<Route name="lorempage" path="lorem" handler={LoremPage} />
    <Route name="write" path="write" handler={Write}>
      <Route name="writeNew" path="new" handler={StoryNode} />
      <Route name="writeOld" path=":key" handler={StoryNode} />
  	  <DefaultRoute handler={Write} />
    </Route>
    <Route name="read" path="read" handler={Read} />
	</Route>
);
