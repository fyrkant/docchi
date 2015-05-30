var React = require('react');
var actions = require('../actions');
var Link = require('react-router').Link;

var Home = React.createClass({
  render: function() {
    return (
  <div className="write-home">
    <article className="type-system-traditional">
      <h1>Välkommen till Docchi</h1>

      <a className="login" onClick={actions.login}>Logga in</a> för att kunna skriva din egen historia, eller <Link to="read">läs någon av de redan skapade</Link>.
    </article>
  </div>);
  }
});

module.exports = Home;
