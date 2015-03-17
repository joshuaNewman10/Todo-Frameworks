/** @jsx React.DOM */

var app = app || {}; //not React stuff, just good thing to put at top of all react app files
app.components = app.components || {};

(function() { //same deal, not react stuff
 'use strict'; 
//note React needs one 'parent container'
  var TodoApp = app.components.TodoApp = React.createClass({ 
    getInitialState: function() {
      return {
        todos: []
      }
    },
    componentDidMount: function() { //pretend getting data from AJAX call
      var data = app.retrieveData(); //React doesnt care how get data, just cares how you render it and get stuff from UI layer
      this.setState({todos: data});
      console.log(this.state); //state when 'mounted'
    },
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
     
var NewTodo = app.components.NewTodo = React.createClass({
  render: function() {
    return (
            <h1>NewTodo</h1>
            );
  }
});

var TodoList = app.components.TodoList = React.createClass({
  render: function() {
    return (
            <h1>Todo List</h1>
            );
  }
});

var ClearCompleted = app.components.ClearCompleted = React.createClass({
  render: function() {
    return (
            <h1>Clear Completed</h1>
            );
  }
});

/*
Properties Vs State 
  Stuff flows down from parents to children but not other way
   Parents can pass data down into children and the children can receive them as props
   But a component can keep its own state. This is important because child can't modify props.
   The props child gets are read only.
   But the state is only kept on that particular component (component level) and is mutable.

   So props flow down and are immutable
   State is stuck at that level and is mutable.
*/

/*
componentDidMount-"Im already on the page now what do you want me to do"
*/

/*
ComponentBeforeMount-What do you want me to do before mount?
*/

/*
Idea behind these two is that want to render some prety things before make the initial data request
*/