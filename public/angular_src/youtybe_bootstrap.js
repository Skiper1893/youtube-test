app.controller('YoutybeController', function YoutybeController($scope, $http, $mdDialog){

	let vm = this;
	$scope.ShowModal = true;
	$scope.status = '  ';
	$scope.customFullscreen = false;

	let localInfo = function() {
		$scope.saved = localStorage.getItem('video');
		$scope.check = (localStorage.getItem('video') !== null) ? JSON.parse(vm.saved) : [{"id": "lfEVLXu3NXs", "category" : "music"}];
		localStorage.setItem('video', JSON.stringify($scope.check));
		console.log($scope.saved);
	}

	function SaveDataToLocalStorage(data) {
		let a = [];
		a = JSON.parse(localStorage.getItem('video'));
		a.push(data);
		console.log(a);
		localStorage.setItem('video', JSON.stringify(a));
	}

	$scope.dialogCtrl = function (){  
      $scope.ShowModal = !$scope.ShowModal;
	};

	$http({method: 'GET', url: 'local.json'}).
				then(function success(response) {
					$scope.video_info = response.data;
	});



	$scope.showPrompt = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.prompt()
      .title('What would you name your dog?')
      .textContent('Bowser is a common name.')
      .placeholder('Dog name')
      .ariaLabel('Dog name')
      .initialValue('Buddy')
      .targetEvent(ev)
      .required(true)
      .ok('Okay!')
      .cancel('I\'m a cat person');

    $mdDialog.show(confirm).then(function(result) {
      $scope.status = 'You decided to name your dog ' + result + '.';
    }, function() {
      $scope.status = 'You didn\'t name your dog.';
    });
  };


//  $scope.showPrerenderedDialog = function(ev) {
//     $mdDialog.show({
//       contentElement: '#myDialog',
//       parent: angular.element(document.body),
//       targetEvent: ev,
//       clickOutsideToClose: true
//     });
//   };
//https://codepen.io/pen/

// function DialogController($scope, $mdDialog) {
//     $scope.hide = function() {
//       $mdDialog.hide();
//     };

//     $scope.cancel = function() {
//       $mdDialog.cancel();
//     };

//     $scope.answer = function(answer) {
//       $mdDialog.hide(answer);
//     };
//   }

  _.concat($scope.video_info, localInfo);

 });