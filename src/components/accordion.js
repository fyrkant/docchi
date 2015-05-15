var React = require('react');

var Accordion = React.createClass({
  accordionClick(ev){
    ev.target.parentNode.classList.toggle('is-expanded');
		ev.preventDefault();
	},

  render: function() {



    return (
      <ul className="accordion">
        <li>
          <a href="#" className="js-accordion-trigger" onClick={this.accordionClick}>{this.props.triggerText}</a>
          <ul className="submenu">
            {this.props.children}
          </ul>
        </li>
      </ul>
    );
  }

});

module.exports = Accordion;
