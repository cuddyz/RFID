rfidApp.controller('scannersController', ['$scope', 'CurrentGame', '$location', function($scope, CurrentGame, $location) {
    $scope.gameRunning = false;
    $scope.loading = true;

    CurrentGame.get().$promise.then(function success(data) {
        console.log(data);
        $scope.game = data;
        $scope.loading = false;
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