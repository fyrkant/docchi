var React = require('react'),
    Reflux = require('reflux'),
    WriteStore = require('../stores/writestore'),
    actions = require('../actions');

var WriterForm = React.createClass({
  mixins:[Reflux.connect(WriteStore)],
  onChange:function(){

  },
  handleSubmit:function(e){
    e.preventDefault();
    var storyPart = {
      title: this.refs.title.getDOMNode().value,
      txt: this.refs.txt.getDOMNode().value,
      isEnding: this.refs.endingCheckbox.getDOMNode().checked
    };
    if(storyPart.title !== "" && storyPart.txt !== ""){
      actions.addStoryPart(storyPart);
      this.emptyForm();
    }
  },
  handleKeyUp: function(evt){
    var storyPart = {
      title: this.refs.title.getDOMNode().value,
      txt: this.refs.txt.getDOMNode().value,
      isEnding: this.refs.endingCheckbox.getDOMNode().checked
    };
		if (evt.which === 13 && storyPart.title !== "" && storyPart.txt !== "") {
      actions.addStoryPart(storyPart);
      this.emptyForm();
		} else if (evt.which === 27) {
			this.emptyForm();
		}
	},
  emptyForm:function(){
    this.refs.title.getDOMNode().value = "";
    this.refs.txt.getDOMNode().value = "";
    this.refs.endingCheckbox.getDOMNode().checked = false;
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>

        <input type="text"
          ref="title"
          className="form-control"
          placeholder="Titel" />

        <textarea ref="txt"
          className="form-control"
          placeholder="Text"
          onKeyUp={this.handleKeyUp} />

        <p><input type="checkbox" name="isEnding" ref="endingCheckbox" />Avslutande del?</p>

        <button className="btn btn-standard btn-default pull-right">Spara</button>

      </form>
    );
  }

});

module.exports = WriterForm;
