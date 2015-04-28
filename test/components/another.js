var React = require('react/addons'),
    assert = require('assert'),
    TodoItem = require('../../src/components/todo-item'),
    TestUtils = React.addons.TestUtils;

describe('Todo-item component', function(){
  before('render and locate element 2', function() {
    var renderedComponent = TestUtils.renderIntoDocument(
      <TodoItem done={true} name="Write Tutorial"/>
    );

    // Searching for <input> tag within rendered React component
    // Throws an exception if not found
    var inputComponent = TestUtils.findRenderedDOMComponentWithTag(
      renderedComponent,
      'input'
    );

    this.inputElement = inputComponent.getDOMNode();
  });

  it('<input> should be of type "checkbox 3"', function() {
    assert(this.inputElement.getAttribute('type') === 'checkbox');
  });

  it('<input> should be checked', function() {
    assert(this.inputElement.checked === true);
  });
});
