rfidApp.controller('adminController', ['$scope', 'CurrentGame', function($scope, CurrentGame) {
    $scope.gameRunning = false;

    CurrentGame.get().$promise.then(function success(data) {
        console.log(data);
        $scope.game = data;
        if (data.active) {
            $scope.gameRunning = true;
        }
    }, function error(res) {
        console.log("ERROR " + res);
    });

    $scope.checkCollapsed = function (event) {
        console.log(event)

    }
}]);