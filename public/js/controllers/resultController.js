rfidApp.controller('resultController', ['$scope', '$stateParams', 'CurrentGame', function($scope, $stateParams, CurrentGame) {
    $scope.gameRunning = false;

    CurrentGame.get().$promise.then(function success(data) {
        console.log(data);
        if (data.active) {
            $scope.game = data;
            $scope.gameRunning = true;
            $scope.type = $stateParams.type;
        }
    }, function error(res) {
        console.log("ERROR " + res);
    });
}]);