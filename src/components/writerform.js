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
      <Draggable cancel="input, textarea, button" start={{x:-25, y:25}}>
        <div className="writer">
          <div className="heading">
            <h3>{this.props.h3}</h3>
          </div>
          <div>
            <form onSubmit={this.handleSubmit}>

              <input type="text"
                ref="title"
                className="form-control"
                placeholder="Titel"
                />

              <textarea ref="txt"
                className="form-control"
                placeholder="Text"
                rows="8"
                />

              <div className="switch">
                <p>Avslutande del?</p>
                <label className="label-switch">
                  <input type="checkbox" name="isEnding" ref="endingCheckbox" />
                  <div className="checkbox"></div>
                </label>
              </div>


              <button className="btn btn-standard btn-default pull-right"  >Spara</button>
            </form>
          </div>
        </div>
      </Draggable>


    );
  }

});

module.exports = WriterForm;
