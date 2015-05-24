var React = require('react/addons');
var _ = require('lodash');
var actions = require('../actions');
var StoryAdder = require('./storyadder');
var marked = require('marked');

var Stories = React.createClass({
  mixins:[React.addons.LinkedStateMixin],
  getInitialState() {
    return {};
  },
  handleAddStart(ev) {

    this.state.isAdding ? this.setState({isAdding: false}) : this.setState({isAdding: true});

    ev.preventDefault();
    ev.stopPropagation();
  },
  handleSubmit:function(e) {
    e.preventDefault();
    e.stopPropagation();
    var storyPart = this.populateStoryPart();
    if (storyPart.title !== '' && storyPart.txt !== '') {
      actions.addStoryPart(storyPart);
      this.emptyForm();
      this.setState({isAdding: false});
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
    var isParent = this.props.selected.isParent;

    _.map(this.props.data, function(story) {
      if (story.children) {
        _.forEach(story.children, function(child) {
          if (child.key === this.props.selected.key) {
            parentKey = story.key;
          }
        }.bind(this));
      }
    }.bind(this));

    if (!this.props.selected.children) {
      if (confirm('Vill du verkligen radera historiadelen med titel ' + this.props.selected.title + ' ?')) {
        actions.destroyStoryPart(this.props.selected.key, parentKey, isParent);
      }
    } else {
      if (confirm('VARNING! Historiedelen du vill radera har barn som också kommer att raderas, är du säker på att du vill detta?')) {
        this.visitChildren(this.props.selected);
        actions.destroyStoryParts(this.toBeBlownUp, parentKey, isParent);
      }
    }
  },
  showNode(ev) {
    ev.target.nextSibling.classList.toggle('hide');
    ev.preventDefault();
  },
  handleEditStart(evt) {
    evt.preventDefault();

    this.setState({
      isEditing: true,
      editValue: this.props.selected.txt
    }, function() {
      this.refs.editInput.getDOMNode().focus();
    });
  },
  handleValueChange(evt) {
    var text = this.state.editValue;

    if (evt.which === 13 && text) {
      this.refs.editInput.getDOMNode().blur();
    } else if (evt.which === 27) {
      this.setState({isEditing: false}, function() {
        this.refs.editInput.getDOMNode().blur();
      });
    }
  },
  handleBlur() {
    var text = this.state.editValue;

    if (this.state.isEditing && text) {
      actions.editStoryPartText(this.props.selected.key, text);
    }
    this.setState({isEditing: false});
  },
  componentWillReceiveProps(nextProps) {
    var allDone = _.find(nextProps.data, function(story) {
      return !story.children && !story.isEnding;
    });

    console.log(allDone);

    if (_.isUndefined(allDone)) {
      console.log('All done, yo!');
      actions.setStatus(nextProps.selected.key, 'done');
    } else {
      console.log('You got some work to do.');
      actions.setStatus(nextProps.selected.key, 'writing');
    }
  },
  render() {
    var editingClass = this.state.isEditing ? 'editing' : '' ;

    var endingClass;
    var addingClass = this.state.isAdding ? 'adding' : '' ;

    var rawMarkup;

    if (!_.isUndefined(this.props.selected)) {
      endingClass = this.props.selected.isEnding ? 'ending' : '' ;
      rawMarkup = rawMarkup = marked(this.props.selected.txt, {sanitize: true});
    }

    return !this.props.selected ? <div /> : (
			<ul className='tree'>
				<li>
					<a href="#" onClick={this.showNode}>{this.props.selected.title}</a>
					<div className={'story-node ' + endingClass + addingClass + editingClass}>
						<div className={editingClass}>

							<span className="view" dangerouslySetInnerHTML={{__html: rawMarkup}} />

							<textarea ref="editInput"
								className="edit"
								valueLink={this.linkState('editValue')}
								onKeyUp={this.handleValueChange}
								onBlur={this.handleBlur} />

							{ this.state.isEditing ? '' : <button className="addBtn" onClick={this.handleAddStart}> <i className="fa fa-plus"></i> { this.state.isAdding ? 'Avbryt' : 'Fortsätt'} </button>}

							{ this.state.isEditing ? <p className="editInfoText">Enter = spara, Esc = avbryt</p> : <button className="editBtn" onClick={this.handleEditStart}> <i className="fa fa-undo"></i> Ändra </button>}

							{ this.state.isAdding || this.state.isEditing ? '' : <button className="deleteBtn" onClick={this.storypartDestroyer}> <i className="fa fa-trash-o fa-2"></i></button>}
						</div>
					</div>          

          { this.state.isAdding ? <StoryAdder {...this.props} handleAddStart={this.handleAddStart} /> : '' }

						{ _.map(this.props.selected.children, function(n) {
  return <Stories key={n.key} data={this.props.data} selected={_.find(this.props.data, function(s) {return s.key === n.key;})} />;
						}.bind(this))}
				</li>
			</ul>
			);
  }
});

module.exports = Stories;
