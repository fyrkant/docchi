var Reflux = require('reflux');

module.exports = Reflux.createActions([
    'deleteTodoLine',
    'submitTodoLine',
    'login',
    'logout',
    'setStatus',
    'addStoryStart',
    'addStoryPart',
    'editStoryPart',
    'destroyStoryPart',
    'destroyStoryParts',
    'unpublish'
]);
