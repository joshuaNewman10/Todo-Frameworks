/** @jsx React.DOM */

var app = app || {}; //not React stuff, just good thing to put at top of all react app files
app.components = app.components || {};

(function() { //same deal, not react stuff
 'use strict'; 
//note React needs one 'parent container'
 var TodoApp = app.components.TodoApp = React.createClass({ 
    render: function() {
      return ( 
        <div className="outer-container"> 
          <NewTodo />
          <TodoList />
          <ClearCompleted />
          <p>Interesting text goes here</p>
        </div>
      );
    }
  });
})();
//root component of app
//double assignment allows this thing to be available in local and other scopes
//note jsx needs closing html tag always (if void tag must have /> e.g. for images/inputs)
//this is JSX stuff
//note must call className bc class is JS reserved word
     

var NewTodo = app.components.NewTodo = React