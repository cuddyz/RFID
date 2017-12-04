rfidApp.controller('previousGamesController', ['$scope', '$http', function($scope, $http) {
    $scope.loading = true;

    $http({
        method: "GET",
        url: "/api/inactive-games"
    }).then(function success(res) {
        console.log(res);
        $scope.games = res.data;
        formatDates();
        $scope.loading = false;
    }, function error(res) {
        console.log("ERROR " + res);
        $scope.error = true;
    });

    var formatDates = function() {
        for (var i = 0; i < $scope.games.length; i++) {
            $scope.games[i].created = moment($scope.games[i].created).format('MMMM Do YYYY, h:mm:ss a');
        }
    }

}]);