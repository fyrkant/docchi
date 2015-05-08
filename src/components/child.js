var React = require('react');

var Child = React.createClass({
  
  render: function() {
    //var childButtons = !_.isEmpty(this.props.parent) ? <span><button onClick={this.handleClick}>X</button><button onClick={this.handleClick}>Y</button></span> : "";

    //var classString = !_.isEmpty(this.props.parent) ? "col-sm-4 well" : "hide";

    var children = this.props.parent.children ? "Har barn" : "";

    return (
      <div className="col-sm-4">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">{this.props.parent.title}</h3>
          </div>
          <div className="panel-body">
            <p >{this.props.parent.txt}</p>
            <button className="btn btn-default" onClick={this.handleClick}>Lägg till fortsättning</button>
          </div>
        </div>
        {children}
      </div>
      );
  }

});

module.exports = Child;
