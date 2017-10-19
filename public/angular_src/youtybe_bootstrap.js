app.controller('YoutybeController', function YoutybeController($scope, $http, $mdDialog){

	//let vm = this;
	$scope.ShowModal = true;
	$scope.status = '  ';
	$scope.customFullscreen = false;

	$scope.new_video = {
 		id : ' ',
 		category : ' ',
 		description : ' '
	};

	$scope.category = ('music movie').split(' ').map(function(state) {
        return  { abbrev: state };
      });

//Get localStroge info about saved 

		let SaveDataToLocalStorage = function(data) {

		$scope.saved = window.localStorage.getItem('video');
		$scope.check = (window.localStorage.getItem('video') !== null) ? JSON.parse($scope.saved) : [{"id": "lfEVLXu3NXs", "category" : "music"}];
		window.localStorage.setItem('video', JSON.stringify($scope.check));
		window.localStorage.setItem('video', JSON.stringify(data));
		$scope.saved = window.localStorage.getItem('video');
		console.log($scope.saved);
	}

	$scope.showAdvanced = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'view/modalContent.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen 
    })
    .then(function(answer) {
    	console.log(answer);
    	SaveDataToLocalStorage(answer);
	});
  };


//get default composition from local.json
	$http({method: 'GET', url: 'local.json'}).
				then(function success(response) {
					$scope.video_info = response.data;
	});


function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }


//Concatenate default video and video from localStorage
_.concat($scope.video_info, this.SaveDataToLocalStorage);

});