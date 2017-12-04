rfidApp.controller('resultController', ['$scope', '$state', '$stateParams', '$http', 'CurrentGame', 'Focus', function($scope, $state, $stateParams, $http, CurrentGame, Focus) {
    $scope.type = $stateParams.type;
    $scope.loading = true;
    if ($scope.type !== 'game' && $scope.type !== 'user') {
        $state.transitionTo('result', {type:"game"});
    }

    $scope.gameRunning = false;

    CurrentGame.get().$promise.then(function success(data) {
        console.log(data);
        $scope.loading = false;
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
        $scope.error = true;
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
            getUser();
            buildUserResults();
        }, function error(res) {
            console.log("ERROR " + res);
            $scope.error = true;
        });
    };

    var buildUserResults = function() {
        $scope.locations = $scope.game.locations;
        checkLocations();
    };

    var checkLocations = function() {
        for (var i = 0; i < $scope.locations.length; i++) {
            $scope.locations[i].visited = false;
            $scope.locations[i].scannerText = "";
            $scope.locations[i].scannerNum = "";
            $scope.locations[i].scanTime = "";
            for (var j = 0; j < $scope.scans.length; j++) {
                if ($scope.locations[i].number === $scope.scans[j].location) {
                    $scope.locations[i].visited = true;
                    $scope.locations[i].scannerText = $scope.locations[i].scanners[$scope.scans[j].scanner - 1].text;
                    $scope.locations[i].scannerNum = $scope.scans[j].scanner;
                    $scope.locations[i].scanTime = moment($scope.scans[j].created).format('h:mm:ss a');
                    break;
                }
            }
        }
    };

    var getUser = function() {
        $http({
            method: "GET",
            url: "/api/user",
            params: {gameId: $scope.game._id, scanId: $scope.scannerInput}
        }).then(function success(res) {
            console.log(res);
            $scope.unregUser = (res.data === "");
            $scope.user = res.data;
            $scope.scannerInput = "";
        }, function error(res) {
            console.log("ERROR " + res);
            $scope.error = true;
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