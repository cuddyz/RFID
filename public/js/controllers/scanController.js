rfidApp.controller('scanController', ['$scope', '$stateParams', '$location', '$http', 'CurrentGame', 'Focus', function($scope, $stateParams, $location, $http, CurrentGame, Focus) {

    CurrentGame.get().$promise.then(function success(data) {
        console.log(data);
        $scope.game = data;
        initScanner();
    }, function error(res) {
        console.log("ERROR " + res);
    });

    var initScanner = function() {
        $scope.locNum = $stateParams.locNum;
        $scope.scannerNum = $location.search().scanner;
        verifyScanner();
    };

    var verifyScanner = function() {
        $scope.validScanner = ($scope.game.locations[$scope.locNum - 1] && $scope.game.locations[$scope.locNum - 1].scanners[$scope.scannerNum - 1]);
        if ($scope.validScanner) {
            $scope.focusInput();
            $scope.scannerInput = "";
        }
    };

    $scope.focusInput = function() {
        Focus('scannerInput');
    };

    $scope.submitScan = function() {
        var scan = {
            gameId: $scope.game._id,
            scanId: $scope.scannerInput,
            location: $scope.locNum,
            scanner: $scope.scannerNum
        };

        $http({
            method: "POST",
            url: "/api/scan",
            data: scan
        }).then(function success(res) {
            console.log(res);
            $scope.scannerInput = "";
        }, function error(res) {
            console.log("ERROR " + res);
        });
    };
}]);