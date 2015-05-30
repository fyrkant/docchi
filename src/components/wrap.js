var React = require('react');
var Reflux = require('reflux');
var WriteStore = require('../stores/writestore');
var ReadStore = require('../stores/readstore');
var LoginStore = require('../stores/loginstore');
var Router = require('react-router');
var RouteHandler = require('react-router').RouteHandler;
var LoginButton = require('./loginbutton');

var Home = React.createClass({
  mixins:[
    Reflux.connect(WriteStore, 'stories'),
    Reflux.connect(ReadStore, 'finishedStories'),
    Reflux.connect(LoginStore, 'user'),
    Router.State
    ],
  render: function() {
    return (
      <div className="home">
        <header>
          <div className="header-items">
            <h1>
              <Router.Link to="home">Docchi</Router.Link>
            </h1>

            <h2 className={'write' + (!this.state.user ? ' hidden' : '')}>
              <Router.Link to="write">Skriv</Router.Link>
            </h2>
            <h2 className="read">
              <Router.Link to="read">Läs</Router.Link>
            </h2>
            <span className="login">
              <LoginButton user={this.state.user} />
            </span>
          </div>
        </header>
        <RouteHandler {...this.props} stories={this.state.stories} finishedStories={this.state.finishedStories} user={this.state.user} />
      </div>
    );
  }

});

module.exports = Home;
