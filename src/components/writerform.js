var React = require('react'),
    _ = require('lodash'),
    StoryList = require('./storylist'),
    $ = require('jquery'),
    Draggable = require('react-draggable'),
    actions = require('../actions');

var WriterForm = React.createClass({
  handleSubmit:function(e){
    e.preventDefault();
    e.stopPropagation();
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
  componentDidMount(){
    $('.js-accordion-trigger').bind('click', function(e){
		  $(this).parent().find('.submenu').toggle('fold');  // apply the toggle to the ul
		  $(this).parent().toggleClass('is-expanded');
		  e.preventDefault();
		});
  },
  render: function() {
    var storyListClass = _.isEmpty(_.filter(this.props.stories, function(s){return s.isParent;})) ? "hide" : "story-list";

    var storyCount = _.toArray(_.filter(this.props.stories, function(s){return s.isParent;})).length;
    var btnTxt = storyCount === 1 ? "oavslutad" : "oavslutade";

    return (
    <div className="writer-wrap">
      <Draggable cancel="input, textarea, button, label, ul, li" grid={[50, 50]}>
        <div className="writer">
          <h4>{this.props.statusWord}:</h4>
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

            <div className={storyListClass}>
    					<ul className="accordion">
    						<li>
    							<StoryList stories={this.props.stories} />
    							<a href="#" className="js-accordion-trigger">{storyCount} {btnTxt}</a>
    						</li>
    					</ul>
    				</div>
        </div>
      </Draggable>
    </div>
    );
  }

});

module.exports = WriterForm;
