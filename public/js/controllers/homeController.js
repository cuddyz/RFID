rfidApp.controller('homeController', ['$scope', 'CurrentGame', function($scope, CurrentGame) {
    $scope.gameRunning = false;
    $scope.loading = true;

    CurrentGame.get().$promise.then(function success(data) {
        console.log(data);
        $scope.loading = false;
        if (data.active) {
            $scope.gameRunning = true;
        }
    }, function error(res) {
        console.log("ERROR " + res);
    });
}]);