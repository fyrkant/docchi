var React = require('react/addons');
var _ = require('lodash');
var marked = require('marked');
var Link = require('react-router').Link;
var Router = require('react-router');

var ReadNode = React.createClass({
  mixins: [Router.Navigation],
  handleChoice(story) {
    console.log(story);
  },
  componentWillUpdate() {
    var node = this.getDOMNode();
    console.log(node);
    this.shouldScrollToBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
  },
  componentDidUpdate() {
    var node = this.getDOMNode();
    node.scrollBottom = node.scrollHeight;
  },
  render() {

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
            return (
                <div key={Math.random()}>
                  <h3 className="segway">{arrayedData[number].title}</h3>
                  <p dangerouslySetInnerHTML={{__html: marked(arrayedData[number].txt, {sanitize: true})}} />
                  {arrayedData[number].isEnding ? <strong>SLUT</strong> : ''}
                  { index !== (array.length - 1) ? '' :  _.map(arrayedData[number].children, function(child) {
                    var foundChild = _.find(this.props.data, function(s) {return s.key === child.key;});
                    var arrayKey = _.findIndex(arrayedData, {key: foundChild.key});

                    return (
                    <h3 key={arrayKey}>
                      <a onClick={() => this.context.router.replaceWith('choicenodes', {key: this.props.params.key, choice: this.props.params.choice + '-' + arrayKey})}>
                        {foundChild.title}
                      </a>
                    </h3>);
                  }.bind(this))}
                </div>);
          }.bind(this)) :
          _.map(this.props.selected.children, function(child) {
            var foundChild = _.find(this.props.data, function(s) {return s.key === child.key;});
            var arrayKey = _.findIndex(arrayedData, {key: foundChild.key});

            return (
              <h3 key={arrayKey}>
                <a onClick={() => this.context.router.replaceWith('choicenodes', {key: this.props.params.key, choice: arrayKey})}>
                  {foundChild.title}
                </a>
              </h3>);
          }.bind(this)) }
			</article>
			);
  }
});

module.exports = ReadNode;
