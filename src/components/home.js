var React = require('react');
var Reflux = require('reflux');
var WriteStore = require('../stores/writestore');
var Router = require('react-router');
var RouteHandler = require('react-router').RouteHandler;

var Home = React.createClass({
  mixins:[Reflux.connect(WriteStore), Router.State],
  render: function() {
    return (
      <div className="home">
        <header>
          <h1>Docchi</h1>

          <h2>
            <span className="write">
              <Router.Link to="beta">Skriv</Router.Link>
              </span>
            <span className="read">
              <Router.Link to="read">Läs</Router.Link>
            </span>
          </h2>
        </header>
        <RouteHandler {...this.props} stories={this.state.stories} />
      </div>
    );
  }

});

module.exports = Home;
