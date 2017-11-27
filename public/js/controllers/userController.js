rfidApp.controller('userController', ['$scope', 'CurrentGame', function($scope, CurrentGame) {
    $scope.gameRunning = false;

    CurrentGame.get().$promise.then(function success(data) {
        console.log(data);
        if (data.active) {
            $scope.gameRunning = true;
            $scope.alias = "";
            $scope.scannerId = "";
        }
    }, function error(res) {
        console.log("ERROR " + res);
    });

    $scope.createUser = function() {
        console.log("Create");
        $scope.alias = "";
        $scope.scannerId = "";

        //Insert HTTP Post to create User in DB
    }
}]);