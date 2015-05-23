var Reflux = require('reflux');

module.exports = Reflux.createActions([
    'deleteTodoLine',
    'submitTodoLine',
    'login',
    'addStoryStart',
    'addStoryPart',
    'editStoryPartText',
    'changeSelected',
    'changeFocus',
    'resetFocus',
    'destroyStoryPart',
    'destroyStoryParts'
]);
