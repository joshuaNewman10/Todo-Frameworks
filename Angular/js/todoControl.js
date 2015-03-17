todo.controller('todoCtrl', function($scope) {
  $scope.todos = [
    {val: "Task 1", completed: false},
    {val: "Task 2", completed: true},
    {val: "Task 3", completed: false},
    {val: "Task 4", completed: true},
    {val: "Task 5", completed: false},
  ];

  $scope.addNewTask = function() {
    $scope.todos.unshift({
      completed: false,
      val: 'new taskk'
    });
  };

  $scope.clearCompleted = function() {
    $scope.todos = $scope.todos.filter(function(todo) {
      return !todo.completed;
    });
  };

  $scope.removeTargetedTodo = function($index) { 
    console.log('in targeted todo');
    $scope.todos.splice($index, 1); //wowzers
  }; //this works also if you pass in the index from the html
});

