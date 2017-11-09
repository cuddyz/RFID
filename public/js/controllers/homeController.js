rfidApp.controller('homeController', ['$scope', '$http', 'CurrentGame', function($scope, $http, CurrentGame) {
    $scope.gameRunning = false;

    CurrentGame.get().$promise.then(function success(data) {
        console.log(data);
        if (data.active) {
            $scope.gameRunning = true;
        }
    }, function error(res) {
        console.log("ERROR " + res);
    });
}]);