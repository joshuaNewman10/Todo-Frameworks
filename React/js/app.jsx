/** @jsx React.DOM */

var app = app || {};

(function() {
  'use strict';

  app.init = function() {
    var TodoApp = app.components.TodoApp;
    React.renderComponent( //says we want a to do app rendered at the appID
      <TodoApp />,
      document.getElementById('app')
    );
  };
  
  app.init();
})();