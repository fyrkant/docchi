var React = require('react');
//var _ = require('lodash'),
var actions = require('../actions');

var WriterForm = React.createClass({
  handleSubmit:function(e) {
    e.preventDefault();
    e.stopPropagation();
    var storyPart = this.populateStoryPart();
    if (storyPart.title !== '' && storyPart.txt !== '') {
      actions.addStoryStart(storyPart);
      this.emptyForm();
    }
  },
  emptyForm:function() {
    this.refs.title.getDOMNode().value = '';
    this.refs.txt.getDOMNode().value = '';
  },
  populateStoryPart:function() {
    return {
      title: this.refs.title.getDOMNode().value,
      txt: this.refs.txt.getDOMNode().value
    };
  },
  render: function() {

    return (
  <div className="write-new">
    <h2>Skriv ny historia.</h2>
      <div className="writer-wrap">
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

              <button>Spara</button>
            </form>
        </div>
      </div>
    </div>
    );
  }

});

module.exports = WriterForm;
