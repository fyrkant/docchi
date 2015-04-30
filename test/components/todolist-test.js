var React = require('react/addons'),
    assert = require('assert'),
    TodoList = require('../../src/components/todolist'),
    TestUtils = React.addons.TestUtils;

describe('Todolist component', function(){
  before('render and locate element', function() {
    var func = function(){
      return null;
    };

    var items = {"test": { "testKey": { "text": "testText"} }};

    var renderedComponent = TestUtils.renderIntoDocument(
      <TodoList onClick={func} items={items}/>
    );

    // Searching for <td> tag within rendered React component
    // Throws an exception if not found
    var todoListComponent = TestUtils.findRenderedDOMComponentWithTag(
      renderedComponent,
      'td'
    );

    this.todoListElement = todoListComponent.getDOMNode();
  });

  it('Text shoud match that of testitems-object', function() {

    var func = function(){
      return null;
    };

    var items = {"test": { "testKey": { "text": "testText"} }};

    var renderedComponent = TestUtils.renderIntoDocument(
      <TodoList onClick={func} items={items}/>
    );

    var text = TestUtils.findRenderedDOMComponentWithTag(
      renderedComponent, 'p'
    );    

    assert.equal(text.getDOMNode().textContent, "testText");

    //assert(this.todoListElement.getAttribute('type') === 'checkbox');
  });

  // it('<input> should not be checked', function() {
  //   assert(this.todoListElement.checked === false);
  // });
});
