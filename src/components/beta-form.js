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
    this.refs.endingCheckbox.getDOMNode().checked = false;
  },
  populateStoryPart:function() {
    return {
      title: this.refs.title.getDOMNode().value,
      txt: this.refs.txt.getDOMNode().value,
      isEnding: this.refs.endingCheckbox.getDOMNode().checked
    };
  },
  render: function() {

    return (
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

            <span className="switch">
              <p><strong>Avslutande del?</strong></p>
              <label className="label-switch">
                <input type="checkbox" name="isEnding" ref="endingCheckbox" />
                <div className="checkbox"></div>
              </label>

              <button>Spara</button>
            </span>
          </form>
      </div>
    </div>
    );
  }

});

module.exports = WriterForm;
