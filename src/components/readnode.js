var React = require('react/addons');
var _ = require('lodash');
var marked = require('marked');

var ReadNode = React.createClass({
  render() {

    var rawMarkup;

    if (!_.isUndefined(this.props.selected)) {
      rawMarkup = rawMarkup = marked(this.props.selected.txt, {sanitize: true});
    }

    return !this.props.selected ? <div /> : (
			<article key={Math.random()} className="type-system-traditional">
				<h1>{this.props.selected.title}</h1>
				<p dangerouslySetInnerHTML={{__html: rawMarkup}} />

				{ _.map(this.props.selected.children, function(n) {
          var foundChild = _.find(this.props.data, function(s) {return s.key === n.key;});

          return <p>{foundChild.title}</p>;
        }.bind(this))}
			</article>
			);
  }
});

module.exports = ReadNode;
