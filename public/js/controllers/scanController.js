rfidApp.controller('scanController', ['$scope', '$stateParams', '$location', 'CurrentGame', function($scope, $stateParams, $location, CurrentGame) {

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
    }
}]);