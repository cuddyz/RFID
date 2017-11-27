rfidApp.controller('scanController', ['$scope', '$stateParams', '$location', '$http', '$timeout', 'CurrentGame', 'Focus', function($scope, $stateParams, $location, $http, $timeout, CurrentGame, Focus) {

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
            $scope.scannerText = $scope.game.locations[$scope.locNum - 1].scanners[$scope.scannerNum - 1].text;
            $scope.scanSuccess = false;
            $scope.duplicateScan =false;
        }
    };

    $scope.focusInput = function() {
        Focus('scannerInput');
    };

    $scope.submitScan = function() {
        if (!$scope.scannerInput || $scope.scannerInput === "") {
            return;
        }

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
            $scope.scanSuccess = true;
            $timeout(function() {
                $scope.scanSuccess = false;
            }, 500);
        }, function error(res) {
            if (res.status === 400) {
                $scope.scannerInput = "";
                $scope.duplicateScan = true;
                $timeout(function() {
                    $scope.duplicateScan = false;
                }, 500);
            } else {
                console.log("ERROR " + res);
            }
        });
    };
}]);