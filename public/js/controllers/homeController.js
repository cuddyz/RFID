rfidApp.controller('homeController', ['$scope', '$http', function($scope, $http) {
    $scope.gameRunning = false;

    $http({
        method: "GET",
        url: "/api/active-game"
    }).then(function success(res) {
        console.log(res);
        if (res.data.active) {
            $scope.gameRunning = true;
        }
    }, function error(res) {
        console.log("ERROR " + res);
    });
}]);