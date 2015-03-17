/*Break multiple models into multiple files for best practice*/

window.TodoItem = Backbone.Model.extend({
  toggle: function() {
    this.set('completed', !this.get('completed'));
  },
  updateText: function(text) {
    this.set('val', text);
  },
  
});

window.TodoItems = Backbone.Collection.extend({
  model: TodoItem,
  initialize: function() {
    this.on('destroy', this.removeElement, this); //nothing is really getting 'destroyed', just taken out of collection
  },
  removeElement: function(model) { 
   this.remove(model);
  },
  filterCompleted: function() { //dont put this logic in the view!!!
    console.log('in filter completedsz')
    this.remove(this.filter(function(item) {
      return item.get('completed');
    })); 
  }
});