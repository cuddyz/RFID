rfidApp.controller('previousResultController', ['$scope', '$stateParams', '$http', function($scope, $stateParams, $http) {
    $scope.loading = true;
    $scope.gameId = $stateParams.gameId;

    if ($scope.gameId && $scope.gameId !== "") {
        $http({
            method: "GET",
            url: "/api/game",
            params: {id: $scope.gameId}
        }).then(function success(res) {
            console.log(res);
            $scope.invalidGame = (res.data === "");
            $scope.game = res.data;
            $scope.loading = false;
            if (!$scope.invalidGame) {
                setupChart();
            }
        }, function error(res) {
            console.log("ERROR " + res);
            $scope.error = true;
        });
    } else {
        $scope.loading = false;
        $scope.invalidGame = true;
    }

    var setupChart = function() {
        $scope.labels = [];
        buildLabels();

        $scope.series = [];
        buildSeries();

        $scope.data = [];
        getData();

        $scope.options = {
            title: {
                display: true,
                text: $scope.game.name + " Results"
            }
        }
    };

    var buildLabels = function() {
        for (var i = 0; i < $scope.game.locations.length; i++) {
            $scope.labels.push($scope.game.locations[i].name);
        }
    };

    var buildSeries = function() {
        var maxScanners = 0;
        for (var i = 0; i < $scope.game.locations.length; i++) {
            if ($scope.game.locations[i].numScanners > maxScanners) {
                maxScanners = $scope.game.locations[i].numScanners;
            }
        }

        for (var j = 0; j < maxScanners; j++) {
            $scope.series.push("Scanner " + (j + 1));
        }
    };

    var getData = function() {
        $http({
            method: "GET",
            url: "/api/results/game",
            params: {gameId: $scope.game._id}
        }).then(function success(res) {
            console.log(res);
            $scope.scans = res.data;
            buildData();
        }, function error(res) {
            console.log("ERROR " + res);
            $scope.error = true;
        });
    };

    var buildData = function() {
        var data = [];
        for (var i = 0; i < $scope.series.length; i++) {
            var dataset = [];
            for (var j = 0; j < $scope.labels.length; j++) {
                dataset.push(0);
            }
            data.push(dataset);
        }

        for (var k = 0; k < $scope.scans.length; k++) {
            data[$scope.scans[k].scanner - 1][$scope.scans[k].location - 1]++;
        }

        $scope.data = data;
    }


}]);