/** @jsx React.DOM */

var app = app || {};
app.components = app.components || {};

(function() {
  'use strict';

  var TodoApp = app.components.TodoApp = React.createClass({ //root component
    getInitialState: function() {
      return { //creating an initial state here
        todos: [] //would really want to get these via Ajax request
      };
    },
    componentWillMount: function() { //comp about to be on page, what should i do first?
      console.log('about to put comp on page');
      //want to render app once here so we get 'perceived page load'
      //then want to go get data (via AJAX) and set initial state
      //then CDM will get called via React
    },
    componentDidMount: function() { //comp already on page
      var data = app.retrieveData(); //react doesnt care how get data or store it
      this.setState({todos:data});
      console.log('current state of app:', this.state);

    },
    render: function() { //note react needs just ONE parent 'container' here is a div
      return (
        <div className="outer-container">
          <NewTodo />
          <TodoList />
          <ClearCompleted />
        </div>
      );
    }
  });

  var NewTodo = app.components.NewTodo = React.createClass({
    render: function() {
      return (
        <p>Hello this is a newTodo</p>
      );
    }
  });

  var TodoList = app.components.TodoList = React.createClass({
    render: function() {
      return (
        <p>Hi this is a new TodoList</p>
      );
    }
  });

  var ClearCompleted = app.components.ClearCompleted = React.createClass({
    render: function() {
      return (
        <p>Hi this is the ClearCompeted Component</p>
      );
    }
  });

})();
