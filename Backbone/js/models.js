/*Break multiple models into multiple files for best practice*/

window.TodoItem = Backbone.model.extend({});

window.TodoItems = Backbone.Collection.extend({
  model: TodoItem
});