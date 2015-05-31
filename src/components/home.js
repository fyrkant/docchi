var React = require('react');
// var actions = require('../actions');
var Link = require('react-router').Link;

var Home = React.createClass({
  render: function() {
    return (
  <div className="write-home">
    <article className="landing">
      <h1>Välkommen till Docchi</h1>

      <p>Logga in för att kunna skriva din egen historia, eller <Link to="read">läs någon av de redan skapade</Link>.</p>
    </article>
  </div>);
  }
});

module.exports = Home;
