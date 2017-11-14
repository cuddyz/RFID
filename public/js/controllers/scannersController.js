rfidApp.controller('scannersController', ['$scope', 'CurrentGame', '$location', function($scope, CurrentGame, $location) {
    $scope.gameRunning = false;

    CurrentGame.get().$promise.then(function success(data) {
        $scope.game = data;
        console.log(data);
        if (data.active) {
            $scope.gameRunning = true;
        }
    }, function error(res) {
        console.log("ERROR " + res);
    });

    $scope.goTo = function(locNum, scanNum) {
        $location.path('/scanners/' + locNum).search('scanner', scanNum);
    }
}]);