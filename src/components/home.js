var React = require('react');
var Link = require('react-router').Link;
var RouteHandler = require('react-router').RouteHandler;

var Home = React.createClass({
  render: function() {
    return (
      <div className="home">
        <header>
          <h1>Docchi</h1>

          <h2>
            <span className="write">
              <Link to="write">Skriv</Link>
              </span>
            <span className="read">
              <Link to="read">Läs</Link>
            </span>
          </h2>
        </header>
        <RouteHandler {...this.props} />
      </div>
    );
  }

});

module.exports = Home;
