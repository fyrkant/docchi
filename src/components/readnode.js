var React = require('react/addons');
var _ = require('lodash');
var marked = require('marked');
var Link = require('react-router').Link;

var ReadNode = React.createClass({
  handleChoice(story) {
    console.log(story);
  },
  componentWillUpdate() {
    var node = this.getDOMNode();
    this.shouldScrollToBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
  },
  componentDidUpdate() {
    if (this.shouldScrollToBottom) {
      var node = this.getDOMNode();
      node.scrollTop = node.scrollHeight;
    }
  },
  render() {
    debugger;

    var arrayedData = _.toArray(this.props.data);

    var chosenPath = this.props.params.choice ? this.props.params.choice : null;

    if (chosenPath) {
      console.log(chosenPath.split(''));
    }

    var rawMarkup = _.isUndefined(this.props.selected) ? '' : marked(this.props.selected.txt, {sanitize: true});

    return !this.props.selected ? <div /> : (
			<article className="type-system-traditional">
				<div key={Math.random()}>
          <h1>{this.props.selected.title}</h1>
				  <p dangerouslySetInnerHTML={{__html: rawMarkup}} />
        </div>

				{ this.props.params.choice ?
          _.map(this.props.params.choice.split('-'), function(number, index, array) {
            console.log(array);
            return (
                <div key={Math.random()}>
                  <h2 className="segway">{arrayedData[number].title}</h2>
                  <p dangerouslySetInnerHTML={{__html: marked(arrayedData[number].txt, {sanitize: true})}} />
                  {arrayedData[number].isEnding ? <strong>SLUT</strong> : ''}
                  { index !== (array.length - 1) ? '' :  _.map(arrayedData[number].children, function(child) {
                    var foundChild = _.find(this.props.data, function(s) {return s.key === child.key;});
                    var arrayKey = _.findIndex(arrayedData, {key: foundChild.key});

                    return <h2 key={arrayKey}><Link to="choicenodes" params={{key: this.props.params.key, choice: this.props.params.choice + '-' + arrayKey}}>{foundChild.title}</Link></h2>;
                  }.bind(this))}
                </div>);
          }.bind(this)) :
          _.map(this.props.selected.children, function(child) {
            var foundChild = _.find(this.props.data, function(s) {return s.key === child.key;});
            var arrayKey = _.findIndex(arrayedData, {key: foundChild.key});

            return <h2 key={arrayKey}><Link to="choicenodes" params={{key: this.props.params.key, choice: arrayKey}}>{foundChild.title}</Link></h2>;
          }.bind(this)) }
			</article>
			);
  }
});

module.exports = ReadNode;
