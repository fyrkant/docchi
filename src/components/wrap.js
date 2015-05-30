var React = require('react');
var Reflux = require('reflux');
var WriteStore = require('../stores/writestore');
var LoginStore = require('../stores/loginstore');
var Router = require('react-router');
var RouteHandler = require('react-router').RouteHandler;
var LoginButton = require('./loginbutton');

var Home = React.createClass({
  mixins:[
    Reflux.connect(WriteStore),
    Reflux.connect(LoginStore, 'user'),
    Router.State
    ],
  render: function() {
    return (
      <div className="home">
        <header>
          <div className="header-items">
            <h1>Docchi</h1>

            <h2>
              <span className="write">
                {this.state.user ? <Router.Link to="write">Skriv</Router.Link> : ''}
              </span>
              <span className="read">
                <Router.Link to="read">Läs</Router.Link>
              </span>
              <span>
                <LoginButton user={this.state.user} />
              </span>
            </h2>
          </div>
        </header>
        <RouteHandler {...this.props} stories={this.state.stories} user={this.state.user} />
      </div>
    );
  }

});

module.exports = Home;
