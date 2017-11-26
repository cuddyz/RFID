rfidApp.controller('scanController', ['$scope', '$stateParams', '$location', 'CurrentGame', 'Focus', function($scope, $stateParams, $location, CurrentGame, Focus) {

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
        alert($scope.scannerInput);
        $scope.scannerInput = "";

        //Insert HTTP POST to DB
    };
}]);