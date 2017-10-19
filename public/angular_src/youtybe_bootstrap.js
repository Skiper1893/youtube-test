app.controller('YoutybeController', function YoutybeController($scope, $http, $mdDialog, $timeout){

	//let vm = this;
	$scope.ShowModal = true;
	$scope.status = '  ';
	$scope.customFullscreen = false;

	$scope.new_video = {
 		id : ' ',
 		category : ' ',
 		description : ' '
	};

$scope.local = JSON.parse(localStorage.getItem('item'));
//get default composition from local.json

$http({method: 'GET', url: 'local.json'}).
        then(function success(response) {
         if($scope.local == null){
          $scope.video_input = response.data;
        } else {
          console.log($scope.local);
         $scope.video_input = $scope.local.concat(response.data);
         console.log("else");
       }
  });

//Get localStroge info about saved 

		let SaveDataToLocalStorage = function(data) {

    let a = [];
    a.push(data);
    saved = JSON.parse(localStorage.getItem('item'));
    info = a.concat(saved);
    info = info.filter(function(x) {
    return x !== undefined && x !== null; 
    });
    console.log(info);
    localStorage.setItem('item', JSON.stringify(info));
	}


$scope.select_category = function (video_input) {
  return video_input.category = $scope.select;
}


/////-----Popup----/////
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
    	SaveDataToLocalStorage(answer);
	});
  };

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

  $scope.category = ('music movie').split(' ').map(function(state) {
        return  { abbrev: state };
      });

});