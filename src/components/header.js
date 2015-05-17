var React = require('react'),    
    Link = require('react-router').Link,
    LoginButton = require('./loginbutton');

var Header = React.createClass({
  render() {
    return (
      <header className="centered-navigation">
        <h1 className="header-title">Docchi</h1>
          <nav>
            <ul id="navigation" className="centered-navigation-menu show">
              <li className="nav-link"><Link to="todoapp">TodoApp</Link></li>
              <li className="nav-link"><Link to="lorempage">LoremPage</Link></li>
              <li className="nav-link"><Link to="write">Write</Link></li>
              <li className="nav-link"><LoginButton /></li>
            </ul>
          </nav>
      </header>
    );
  }

});

module.exports = Header;
