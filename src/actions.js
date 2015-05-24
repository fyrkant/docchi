var Reflux = require('reflux');

module.exports = Reflux.createActions([
    'deleteTodoLine',
    'submitTodoLine',
    'login',
    'setStatus',
    'addStoryStart',
    'addStoryPart',
    'editStoryPartText',
    'destroyStoryPart',
    'destroyStoryParts'
]);
