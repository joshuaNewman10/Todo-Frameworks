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
    updateVal: function(val, index) { //since todos live at this level we must have update here
      var state = this.state; //Brian's pattern, might be antipattern?
      state.todos[index].val = val;
      this.setState(state);
    },
    deleteTodo: function(index) {
      var state = this.state;
      state.todos.splice(index, 1);
      this.setState(state);
    },
    toggleCompleted: function(index) {
      var state = this.state;
      state.todos[index].completed =  !state.todos[index].completed;
      this.setState(state);
    },
    render: function() { //note react needs just ONE parent 'container' here is a div
      return (
        <div className="outer-container">
          <NewTodo />
          <TodoList
            todos = {this.state.todos}
            updateVal = {this.updateVal} //pasing updateVal func from TodoApp to TodoList
            toggleCompleted = {this.toggleCompleted}
            deleteTodo = {this.deleteTodo}
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
    handleVal: function(event) {
      this.props.updateVal(event.target.value, this.props.index); //javascript DOM stuff (https://developer.mozilla.org/en-US/docs/Web/API/Event/target)
    },
    handleToggle: function(event) {
      this.props.toggleCompleted(this.props.index);
    },
    handleDelete: function(event) {
      this.props.deleteTodo(this.props.index);
    },
    render: function() {
      var inputClassName = "form-control";
      if ( this.props.todo.completed ) {
        inputClassName += " finished";
      }
      return (
        <div className = "input-group input-group-lg">
          <span className = "input-group-addon">
            <input onChange = {this.handleToggle} checked = {this.props.todo.completed} type = "checkbox" />
          </span> 
          <input onChange = {this.handleVal} type = "text" value = {this.props.todo.val} className = {inputClassName} />
          <span className = "input-group-btn">
            <button onClick = {this.handleDelete} className = "btn btn-danger" type = "button">
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
                toggleCompleted = {this.props.toggleCompleted}
                deleteTodo = {this.props.deleteTodo}
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
