window.TodoView = Backbone.View.extend({
  initialize: function() { //these are events on the model itself, data events
    // this.model.on('change', this.render, this); //this is what basically makes 2 way data binding work
    this.listenTo(this.model, "change", this.render, this); //new way to do it! Cleans up event listener
  },
  events: { //these are events on DOM (coming from the view)
    'change input[type=checkbox]' : 'toggle', //change is reserved BB word
            //from input[] on is just a jQuery selector, should probably put a class instead
    'change .form-control' : 'update',
    'click .btn-danger' : 'remove'
  },
  remove: function() {
    this.model.destroy(); //destroy is bb event/function
  },
  update: function() {
    this.model.updateText(text.$('.form-control').val());
  },
  toggle: function() {
    this.model.toggle();
  },
  template: _.template('<span class="input-group-addon"><input <%= completed ? "checked=checked" : "" %> type="checkbox"></span><input value="<%= val %>" class="form-control<%= completed ? " finished" : "" %>" type="text"><span class="input-group-btn"><button class="btn btn-danger" type="button"><i class="glyphicon glyphicon-remove"></i></button></span>'),
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
  className: 'input-group input-group-lg' //className of parent elements
});

window.TodosView = Backbone.View.extend({ //great best practice for Backbone
  initialize: function() {
    this.collection.on('add', this.addOne, this);
    this.collection.on('reset', this.addAll, this);
    this.collection.on('destroy', this.render, this);
  },
  addOne: function(todoItem) {
    var todoView = new TodoView({model: todoItem});
    this.$el.append(todoView.render().el);
  },
  addAll: function() {
    this.$el.empty(); //get everything out
    this.collection.forEach(this.addOne, this);
  },
  filterCompleted: function() {
    this.collection.filterCompleted();
    this.render();
  }, 
  render: function() {
    this.addAll();
    return this;
  }
});