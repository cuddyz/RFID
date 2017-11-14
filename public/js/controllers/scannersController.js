rfidApp.controller('scannersController', ['$scope', 'CurrentGame', function($scope, CurrentGame) {
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
}]);