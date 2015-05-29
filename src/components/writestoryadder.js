var React = require('react/addons');
var _ = require('lodash');
var actions = require('../actions');

var StoryAdder = React.createClass({
  mixins:[React.addons.LinkedStateMixin],
  getInitialState() {
    return {};
  },
  handleCancel(e) {
    e.preventDefault();
    e.stopPropagation();

    this.props.handleAddStart();
  },
  handleSubmit:function(e) {
    e.preventDefault();
    e.stopPropagation();
    var storyPart = this.populateStoryPart();
    if (storyPart.title !== '' && storyPart.txt !== '') {
      actions.addStoryPart(storyPart);
      this.emptyForm();
      this.props.handleAddStart();
    }
  },
  emptyForm:function() {
    this.refs.title.getDOMNode().value = '';
    this.refs.txt.getDOMNode().value = '';
  },
  populateStoryPart:function() {
    return {
      title: this.refs.title.getDOMNode().value,
      txt: this.refs.txt.getDOMNode().value,
      isEnding: this.refs.endingCheckbox.getDOMNode().checked,
      parentKey: this.props.selected.key
    };
  },
  toBeBlownUp: [],
  visitChildren(obj) {

    console.log('visiting' + obj.title);
    this.toBeBlownUp.push(obj.key);

    if (!obj.children) {
      return;
    }

    _.forEach(obj.children, function(child) {
      var foundChild = _.find(this.props.data, function(s) {return s.key === child.key;});
      this.visitChildren(foundChild);
    }.bind(this));
  },
  storypartDestroyer() {
    this.toBeBlownUp = [];
    var parentKey = '';

    _.map(this.props.data, function(story) {
      if (story.children) {
        _.forEach(story.children, function(child) {
          if (child.key === this.props.selected.key) {
            parentKey = story.key;
          }
        }.bind(this));
      }
    }.bind(this));

    console.log(parentKey);

    if (!this.props.selected.children) {
      if (confirm('Vill du verkligen radera historiadelen med titel ' + this.props.selected.title + ' ?')) {
        actions.destroyStoryPart(this.props.selected.key, parentKey);
      }
    } else {
      if (confirm('VARNING! Historiedelen du vill radera har barn som också kommer att raderas, är du säker på att du vill detta?')) {
        this.visitChildren(this.props.selected);
        actions.destroyStoryParts(this.toBeBlownUp, parentKey);
      }
    }
  },
  render() {
    return (
          <div className="story-adder">
            <div className="writer">
              <form onSubmit={this.handleSubmit}>
                <input type="text"
                  ref="title"
                  placeholder="Titel"
                />
                <textarea ref="txt"
                  placeholder="Text"/>

                <span className="switch">
                  <p>Avslutande del?</p>
                  <input type="checkbox" name="isEnding" ref="endingCheckbox" />
                  <div className="checkbox"></div>
                  <button className="addBtn cancelAdd" onClick={this.handleCancel}>Avbryt</button>
                  <button>Spara</button>
                </span>
              </form>
            </div>
          </div>);
  }
});

module.exports = StoryAdder;
