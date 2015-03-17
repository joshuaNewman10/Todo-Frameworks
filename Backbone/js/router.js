window.TodoApp = new (Backbone.Router.extend({ //iife because will only ever have one router
  routes: { '' : 'index' }, //base route, run index controller/function
  initialize: function() { //will get everything rendered on first load
    this.todoItems = new TodoItems();
    this.todosView = new TodosView({collection: this.todoItems});
    this.todosView.render();

    $('.btn.clear').click(function(e) {
      window.TodoApp.todosView.filterCompleted();
    });

    $('.btn-success').click(function() {
      window.TodoApp.todoItems.add({val: $('#newTodo').val(), completed: false}); //add new todo to items
      $('#newTodo').val('');
    });
  },
  index: function() {
    var fixtures = [
      {val: 'task 1', completed: true},
      {val: 'task 2', completed: false},
      {val: 'task 3', completed: true},
      {val: 'task 4', completed: false},
      {val: 'task 5', completed: true}
    ];
    $('#app').html(this.todosView.el);
    this.todoItems.reset(fixtures); //take all fixtures and throw straight into model/collection
  },
  start: function() { //not BB reserved thing, common BB paradigm
    Backbone.history.start();
  }
}));