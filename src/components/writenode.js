var React = require('react/addons');
var _ = require('lodash');
var actions = require('../actions');
var Router = require('react-router');
var StoryAdder = require('./writestoryadder');
var marked = require('marked');

var WriteNode = React.createClass({
  mixins:[React.addons.LinkedStateMixin, Router.Navigation],
  getInitialState() {
    return {};
  },
  handleAddStart() {
    this.state.isAdding ? this.setState({isAdding: false}) : this.setState({isAdding: true});
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
    ev.target.nextSibling.nextSibling.classList.toggle('hide');
    ev.preventDefault();
  },
  handleEditStart(evt) {
    evt.preventDefault();

    this.setState({
      isEditing: true,
      titleEditValue: this.props.selected.title,
      textareaEditValue: this.props.selected.txt,
      checkboxEditValue: this.props.selected.isEnding
    }, function() {
      this.refs.editTitleInput.getDOMNode().focus();
    });
  },
  handleEditSubmit () {
    var title = this.state.titleEditValue;
    var text = this.state.textareaEditValue;
    // var isEnding = this.state.checkboxEditValue;

    var edited = {
      title: this.state.titleEditValue,
      txt: this.state.textareaEditValue,
      isEnding: this.state.checkboxEditValue !== undefined ? this.state.checkboxEditValue : false
    };

    if (this.state.isEditing && _.trim(text) && _.trim(title)) {
      actions.editStoryPart(this.props.selected.key, edited);
    }
    this.setState({isEditing: false});
  },
  handleCancelEdit() {
    this.setState({isEditing: false}, function() {
        this.refs.editInput.getDOMNode().blur();
      });
  },
  componentWillReceiveProps(nextProps) {
    var allDone = _.find(nextProps.data, function(story) {
      return !story.children && !story.isEnding;
    });

    var status;

    if (_.isUndefined(allDone)) {
      status = 'done';
    } else {
      status = 'writing';
    }
    actions.setStatus(this.props.params.key, status);

    if (!nextProps.data) {
      this.replaceWith('write');
    }
  },
  render() {
    var editingClass = this.state.isEditing ? 'editing' : '' ;

    var endingClass;
    var addingClass = this.state.isAdding ? 'adding' : '' ;

    var rawMarkup;

    if (!_.isUndefined(this.props.selected)) {
      endingClass = this.props.selected.isEnding ? 'ending' : '' ;
      rawMarkup = marked(this.props.selected.txt, {sanitize: true});
    }

    return !this.props.selected ? <div /> : (
			<ul className='tree'>
				<li>
					<h2 className={(this.state.isEditing ? 'hide' : 'viewTitle') + endingClass} onClick={this.showNode}>
            {this.props.selected.title}
          </h2>
          <input ref="editTitleInput"
            className={this.state.isEditing ? 'editTitle' : 'hide'}
            valueLink={this.linkState('titleEditValue')} />
					<div className={'story-node ' + endingClass + addingClass + editingClass}>
						<div className={editingClass}>

							<div className="text-scroller">
                <span className="view" dangerouslySetInnerHTML={{__html: rawMarkup}} />
              </div>

							<textarea ref="editInput"
								className="edit"
								valueLink={this.linkState('textareaEditValue')} />

							{ this.state.isEditing || this.state.isAdding ? '' :
              <button className="addBtn" onClick={this.handleAddStart}>
                <i className="fa fa-plus"></i>
                Fortsätt
              </button>}

							{ this.state.isEditing ?
                <span className="editingBtnGroup">
                  { !this.props.selected.children ? <div><p>Avslutande del?</p>
                  <input type="checkbox" checkedLink={this.linkState('checkboxEditValue')} /></div> : ''}
                  <button className="save" onClick={this.handleEditSubmit}>Spara</button>
                  <button className="cancel" onClick={this.handleCancelEdit}>Avbryt</button>
                </span> :
                <button className="editBtn" onClick={this.handleEditStart}> <i className="fa fa-undo"></i> Ändra </button>}

							{ this.state.isAdding || this.state.isEditing ? '' :
                <button className="deleteBtn" onClick={this.storypartDestroyer}>
                  <i className="fa fa-close fa-2"></i>
                </button>}
						</div>
					</div>

          { this.state.isAdding ? <StoryAdder {...this.props} handleAddStart={this.handleAddStart} /> : '' }

						{ _.map(this.props.selected.children, function(n) {
  return <WriteNode {...this.props} key={n.key} data={this.props.data} selected={_.find(this.props.data, function(s) {return s.key === n.key;})} />;
						}.bind(this))}
				</li>
			</ul>
			);
  }
});

module.exports = WriteNode;
