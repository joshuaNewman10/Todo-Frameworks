/** @jsx React.DOM */

var app = app || {};
app.components = app.components || {};

(function() {
  'use strict';

  var TodoApp = app.components.TodoApp = React.createClass({ //root component
    getInitialState: function() {
      return { //creating an initial state here
        todos: [] //would really want to get these via Ajax request
      }; //note todos live here! State of parent elem is where they actually live
    },
    updateVal: function(val, index) { //since todos live at this level we must have update here
      var state = this.state;
      state.todos[index].val = val;
      this.setState(state);
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
          <TodoList
            todos = {this.state.todos}
            updateVal = {this.updateVal} //pasing updateVal func from TodoApp to TodoList
          />
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
  
  var TodoItem = app.components.TodoItem = React.createClass({
    render: function() {
      var inputClassName = "form-control";
      if ( this.props.todo.completed ) {
        inputClassName += " finished";
      }
      return (
        <div className = "input-group input-group-lg">
          <span className = "input-group-addon">
            <input checked = {this.props.todo.completed} type = "checkbox" />
          </span>
          <input type = "text" value = {this.props.todo.val} className = {inputClassName} />
          <span className = "input-group-btn">
            <button className = "btn btn-danger" type = "button">
              <i className = "glyphicon glypicon-remove"></i>
            </button>
          </span>
        </div>
      );
    }
  });

  var TodoList = app.components.TodoList = React.createClass({
    render: function() {
      return (
        <div className="todos">
          {this.props.todos.map(function(todo, index) {
            return (
              <TodoItem
                todo = {todo}
                index = {index}
                updateVal = {this.props.updateVal} //passing function down from Todo App to TodoList to todoItem

              />
            );
          }.bind(this))} 
        </div> //map ruins our cs
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
