rfidApp.controller('editUsersController', ['$scope', '$http', 'CurrentGame', function($scope, $http, CurrentGame) {
    $scope.gameRunning = false;
    $scope.loading = true;

    CurrentGame.get().$promise.then(function success(data) {
        console.log(data);
        $scope.game = data;
        if (data.active) {
            $scope.gameRunning = true;
            getUsers();
        }
        $scope.loading = false;
    }, function error(res) {
        console.log("ERROR " + res);
        $scope.error = true;
    });

    var getUsers = function() {
        $http({
            method: "GET",
            url: "/api/users",
            params: {gameId: $scope.game._id}
        }).then(function success(res) {
            console.log(res);
            $scope.users = res.data;
        }, function error(res) {
            console.log("ERROR " + res);
            $scope.error = true;
        });
    }
}]);