var React = require('react');
var Link = require('react-router').Link;
var LoginButton = require('./loginbutton');

var Header = React.createClass({
  render() {
    return (
      <header className="centered-navigation">
        <h1 className="header-title">Docchi</h1>
          <nav>
            <ul id="navigation" className="centered-navigation-menu show">
              <li className="nav-link"><Link to="write">Skriv</Link></li>
              <li className="nav-link"><Link to="write">Läs</Link></li>
              <li className="nav-link"><LoginButton /></li>
            </ul>
          </nav>
      </header>
    );
  }
});

module.exports = Header;
