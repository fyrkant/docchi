var React = require('react');
var actions = require('../actions');

var StartForm = React.createClass({
  handleSubmit:function(e) {
    e.preventDefault();
    e.stopPropagation();
    var storyPart = this.populateStoryStart();
    if (storyPart.title !== '' && storyPart.txt !== '') {
      actions.addStoryStart(storyPart, this.props.user);
      this.emptyForm();
    }
  },
  emptyForm:function() {
    this.refs.title.getDOMNode().value = '';
    this.refs.txt.getDOMNode().value = '';
  },
  populateStoryStart:function() {
    return {
      title: this.refs.title.getDOMNode().value,
      txt: this.refs.txt.getDOMNode().value
    };
  },
  render: function() {

    return (
  <div className="write-new">
    <h2>Skriv ny historia.</h2>
      <div className="story-starter">
        <div className="writer">
          <form onSubmit={this.handleSubmit}>

              <input type="text"
                ref="title"
                placeholder="Titel"
                />

              <textarea ref="txt"
                placeholder="Text"
                rows="8"
                />

              <button className="cancel">Avbryt</button>
              <button className="save">Spara</button>
            </form>
        </div>
      </div>
    </div>
    );
  }

});

module.exports = StartForm;
