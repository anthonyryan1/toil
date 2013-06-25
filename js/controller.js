"use strict";
app.controller('toil_controller', function( $scope, Project, filterFilter) {
	$scope.newTodo = "";
	$scope.newSubtask = "";

	$scope.selected = null;
	$scope.showDetails = false;

	$scope.filterUI = { urgent: true, important: true };
	$scope.filterI = { urgent: false, important: true };
	$scope.filterU = { urgent: true, important: false };
	$scope.filterE = { urgent: false, important: false };

	$scope.countUI = 0;
	$scope.countI = 0;
	$scope.countU = 0;
	$scope.countE = 0;

	//Initial data fetch
	Project.all(function(tasks){
		$scope.tasks = tasks;

		$scope.countUI = filterFilter($scope.tasks, $scope.filterUI).length;
		$scope.countI = filterFilter($scope.tasks, $scope.filterI).length;
		$scope.countU = filterFilter($scope.tasks, $scope.filterU).length;
		$scope.countE = filterFilter($scope.tasks, $scope.filterE).length;
	});

	// Scan for changes every 10 seconds, except times when the document is hidden
	setInterval(function(){

		//Don't run ajax if the document is hidden
		if (document[(typeof document.hidden !== 'undefined' ? 'hidden' : 'webkitHidden')]) return;

		Project.all(function(tasks){
			$scope.tasks = tasks;

			$scope.countUI = filterFilter($scope.tasks, $scope.filterUI).length;
			$scope.countI = filterFilter($scope.tasks, $scope.filterI).length;
			$scope.countU = filterFilter($scope.tasks, $scope.filterU).length;
			$scope.countE = filterFilter($scope.tasks, $scope.filterE).length;
		});
	},10000);

	$scope.add = function() {
		if ($scope.newTodo.length === 0) return;

		new Project({
			title: $scope.newTodo,
			urgent: false,
			important: false,
			note: "",
			subtasks: [],
			completed: false,
			added: (new Date().getTime()),
		})

		.$save(function(itemWithID){
			$scope.tasks.push(itemWithID);
			$scope.newTodo = '';
			$scope.countE++;
		});
	};

	$scope.addSubtask = function( todo ) {
		if ($scope.newSubtask.length === 0) return;

		todo.subtasks.push({
			title: $scope.newSubtask,
			completed: false,
		});
		todo.$update();

		$scope.newSubtask = '';
	};

	$scope.removeSubtask = function( todo, subtask ) {
		todo.subtasks.splice(todo.subtasks.indexOf(subtask), 1);
		todo.$update();
	};


	$scope.remove = function( todo ) {
		$scope.tasks.splice($scope.tasks.indexOf(todo), 1);
		todo.$remove();

		$scope.countUI = filterFilter($scope.tasks, $scope.filterUI).length;
		$scope.countI = filterFilter($scope.tasks, $scope.filterI).length;
		$scope.countU = filterFilter($scope.tasks, $scope.filterU).length;
		$scope.countE = filterFilter($scope.tasks, $scope.filterE).length;
	};

	$scope.editTitle = $scope.editNote = function( todo ) {
		todo.$update();
	}

	$scope.toggleImportant = $scope.toggleUrgent = function( todo ) {
		$scope.countUI = filterFilter($scope.tasks, $scope.filterUI).length;
		$scope.countI = filterFilter($scope.tasks, $scope.filterI).length;
		$scope.countU = filterFilter($scope.tasks, $scope.filterU).length;
		$scope.countE = filterFilter($scope.tasks, $scope.filterE).length;
		todo.$update();
	};

	$scope.details = function( todo ) {
		$scope.showDetails = true;
		$scope.selected = todo;
	};

	$scope.hideDetails = function() {
		$scope.showDetails = false;
		$scope.selected = null;
	};
});