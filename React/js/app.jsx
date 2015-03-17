/** @jsx React.DOM */

var app = app || {}; //not react stuff

(function() { //not react stuff
 'use strict';
  app.init = function() {
    var TodoApp = app.components.TodoApp; 
    React.renderComponent(
                          <TodoApp />,
                          document.getElementById('app')
                          ); 
  };

  app.retrieveData = function() { 
    return app.FIXTURES; //fake data..would want to do AJAX req
  };
 app.init();
})();
//note this is just a flavour of React
//we call TodoApp (from line 9) in line 11
//JSX turns these components into function call
//saying we want a TodoApp rendered a the Todo App ID