rfidApp.controller('userController', ['$scope', '$http', 'CurrentGame', function($scope, $http, CurrentGame) {
    $scope.gameRunning = false;

    CurrentGame.get().$promise.then(function success(data) {
        console.log(data);
        if (data.active) {
            $scope.game = data;
            $scope.gameRunning = true;
            $scope.alias = "";
            $scope.scanId = "";
            $scope.scanSuccess = false;
            $scope.duplicateUser = false;
        }
    }, function error(res) {
        console.log("ERROR " + res);
    });

    $scope.createUser = function() {
        if (!$scope.alias || $scope.alias === "" || !$scope.scanId || $scope.scanId === "") {
            return
        }
        var user = {
            alias: $scope.alias,
            scanId: $scope.scanId,
            gameId: $scope.game._id
        };

        $http({
            method: "POST",
            url: "/api/user",
            data: user
        }).then(function success(res) {
            console.log(res);
            $scope.alias = "";
            $scope.scanId = "";
            /*
            $scope.scanSuccess = true;
            $timeout(function() {
                $scope.scanSuccess = false;
            }, 500);
            */
        }, function error(res) {
            if (res.status === 400) {
                $scope.alias = "";
                $scope.scanId = "";
                /*
                $scope.duplicateUser = true;
                $timeout(function() {
                    $scope.duplicateUser = false;
                }, 500);
                */
            } else {
                console.log("ERROR " + res);
            }
        });
    }
}]);