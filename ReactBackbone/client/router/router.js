var Router = Backbone.Router.extend({
  routes: {
    '': 'todo',
    'foo': 'foo',
    'bar': 'bar'
  },
  todo: function() {
    console.log('index');
  },
  foo: function() {
    React.renderComponent(
       
    );
  },
  bar: function() {
    console.log('bar');
  }
});

new Router();

Backbone.history.start();