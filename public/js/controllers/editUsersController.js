rfidApp.controller('editUsersController', ['$scope', '$http', 'CurrentGame', function($scope, $http, CurrentGame) {
    $scope.gameRunning = false;
    $scope.loading = true;

    CurrentGame.get().$promise.then(function success(data) {
        console.log(data);
        $scope.game = data;
        if (data.active) {
            $scope.gameRunning = true;
            getUsers();
        } else {
            $scope.loading = false;
        }
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
            $scope.loading = false;
        }, function error(res) {
            console.log("ERROR " + res);
            $scope.error = true;
        });
    };

    $scope.editUser = function(user) {
        user.newAlias = user.alias;
        user.edit = true;
    };

    $scope.updateUser = function(user) {
        var updatedUser = {
            id: user._id,
            alias: user.newAlias
        };

        $http({
            method: "PUT",
            url: "/api/update-user",
            data: updatedUser
        }).then(function success(res) {
            console.log(res);
            user.alias = user.newAlias;
            user.edit = false;
        }, function error(res) {
            console.log("ERROR " + res);
            $scope.error = true;
        });
    };

    $scope.cancelUpdate = function(user) {
        user.edit = false;
    };
}]);