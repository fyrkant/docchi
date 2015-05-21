var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var DocchiStore = require('../stores/docchistore');
// var actions = require('../actions');
var _ = require('lodash');
var StoryNode = require('./storynode');
var WriterForm = require('./writerform');

var Write = React.createClass({
  mixins:[Reflux.connect(DocchiStore), Router.State],
  getInitialState() {
    return {
      statusWord:'Skriv',
      h3:'Ny historia',
      stories: {},
      selected:'',
      focus:{}
    };
  },
  componentDidMount: function() {
    // if (!_.isEmpty(this.context.router.getCurrentParams().key)) {
    //
    //   var key = this.context.router.getCurrentParams().key;
    //   var foundSelected = _.find(this.state.stories, function(s){return s.key === key;});
    //
    //   console.log(foundSelected);
    //
    //   actions.changeSelected(foundSelected);
    // }

    if (_.isEmpty(this.state.selected)) {
      console.log('tom');
    } else {
      console.log('inte tom');
    }
  },
  render() {

    console.log(this.context.router.getCurrentPath());

    var status;

    switch (this.context.router.getCurrentPath()) {
      case '/write/new':
        status = 'I should start something new.';
        break;
      default:
        status = 'Why don\'t I ever finish what I\'ve started?';
        break;
    }

    console.log(status);

    //var selectedStory = _.find(this.props.stories, function(story){ return story.key === this.props.key; }.bind(this));

    return (
    <div>

      {
        !_.isEmpty(this.state.selected) ? (
          <StoryNode stories={this.state.stories} key={this.state.selected.key} selected={this.state.selected} />
          ) : <div />
      }


      <WriterForm focus={this.state.focus} h3={this.state.h3} statusWord={this.state.statusWord} stories={this.state.stories} />
    </div>
    );
  }
});

module.exports = Write;
