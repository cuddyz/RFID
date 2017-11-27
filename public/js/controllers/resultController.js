rfidApp.controller('resultController', ['$scope', '$state', '$stateParams', '$http', 'CurrentGame', 'Focus', function($scope, $state, $stateParams, $http, CurrentGame, Focus) {
    $scope.type = $stateParams.type;
    if ($scope.type !== 'game' && $scope.type !== 'user') {
        $state.transitionTo('result', {type:"game"});
    }

    $scope.gameRunning = false;

    CurrentGame.get().$promise.then(function success(data) {
        console.log(data);
        if (data.active) {
            $scope.game = data;
            $scope.gameRunning = true;

            if ($scope.type === 'game') {
                setupChart();
            } else {
                $scope.focusInput();
                $scope.scannerInput = "";
            }
        }
    }, function error(res) {
        console.log("ERROR " + res);
    });

    $scope.focusInput = function() {
        Focus('scannerInput');
    };

    $scope.getUserResults = function() {
        if (!$scope.scannerInput || $scope.scannerInput === "") {
            return;
        }

        $http({
            method: "GET",
            url: "/api/results/user",
            params: {gameId: $scope.game._id, scanId: $scope.scannerInput}
        }).then(function success(res) {
            console.log(res);
            $scope.scans = res.data;
            $scope.scannerInput = "";
        }, function error(res) {
            console.log("ERROR " + res);
        });
    };

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