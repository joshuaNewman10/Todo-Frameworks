window.TodoView = Backbone.View.extend({
  
  template: _.template('<span class="input-group-addon"><input <%= completed ? "checked=checked" : "" %> type="checkbox"></span><input value="<%= val %>" class="form-control<%= completed ? " finished" : "" %>" type="text"><span class="input-group-btn"><button class="btn btn-danger" type="button"><i class="glyphicon glyphicon-remove"></i></button></span>'),

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
  className: 'input-group input-group-lg' //className of parent elements
});

window.TodosView = Backbone.View.extend({ //great best practice for Backbone
  addOne: function(todoItem) {
    var todoView = new TodoView({model: todoItem});
    this.$el.append(todoView.render().el);
  },
  addAll: function() {
    this.$el.empty(); //get everything out
    this.collection.forEach(this.addOne, this);
  },
  render: function() {
    this.addAll();
    return this;
  }
});