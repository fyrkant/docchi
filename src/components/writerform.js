var React = require('react'),
    _ = require('lodash'),
    Draggable = require('react-draggable'),
    actions = require('../actions');

var WriterForm = React.createClass({
  handleSubmit:function(e){
    e.preventDefault();
    var storyPart = this.populateStoryPart();
    if(storyPart.title !== "" && storyPart.txt !== ""){
      actions.addStoryPart(storyPart);
      this.emptyForm();
    }
  },
  emptyForm:function(){
    this.refs.title.getDOMNode().value = "";
    this.refs.txt.getDOMNode().value = "";
    this.refs.endingCheckbox.getDOMNode().checked = false;
  },
  populateStoryPart:function(){
    var storyPart = {
      title: this.refs.title.getDOMNode().value,
      txt: this.refs.txt.getDOMNode().value,
      isEnding: this.refs.endingCheckbox.getDOMNode().checked,
      parentKey: _.isUndefined(this.props.focus) ? "" : this.props.focus.key
    };

    return storyPart;
  },
  render: function() {
    return (
      <Draggable cancel="input, textarea, button, label">
        <div className="writer">
          <h3>{this.props.h3}</h3>
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
      </Draggable>


    );
  }

});

module.exports = WriterForm;
