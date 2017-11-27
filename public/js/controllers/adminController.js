rfidApp.controller('adminController', ['$scope', 'CurrentGame', '$http', '$state', function($scope, CurrentGame, $http, $state) {
    $scope.gameRunning = false;
    $scope.loading = true;

    CurrentGame.get().$promise.then(function success(data) {
        console.log(data);
        $scope.game = data;
        $scope.loading = false;
        if (data.active) {
            $scope.gameRunning = true;
        }
    }, function error(res) {
        console.log("ERROR " + res);
    });

    $scope.deactivateGame = function() {
        var answer = confirm("Are you sure you wish to deactivate the current game?");

        if (answer) {
            $http({
                method: "PUT",
                url: "/api/deactivate-game",
                data: {id: $scope.game._id}
            }).then(function success(res) {
                console.log(res);
                $state.transitionTo('home');
            }, function error(res) {
                console.log("ERROR " + res);
            });
        }
    };
}]);