rfidApp.controller('editController', ['$scope', 'CurrentGame', function($scope, CurrentGame) {
    $scope.gameRunning = false;

    $scope.gameTypes = [
        "Standard",
        "Voting",
        "Question"
    ];

    CurrentGame.get().$promise.then(function success(data) {
        $scope.game = data;
        console.log(data);
        if (data.active) {
            $scope.gameRunning = true;
            init();
        }
    }, function error(res) {
        console.log("ERROR " + res);
    });

    var init = function() {
        $scope.gameName = $scope.game.name;
        $scope.numLocations = $scope.game.locations.length;
        $scope.locations = $scope.game.locations;

        $scope.selectedLoc = $scope.locations[0];
        $scope.numScanners = $scope.selectedLoc.numScanners;
    };

    $scope.updateLocations = function(newValue, oldValue) {
        var changeValue = newValue - oldValue;
        if (changeValue >= 0) {
            var counter = Number(oldValue) + 1;
            while (counter <= newValue) {
                var locationTemplate = {
                    number: counter,
                    name: "",
                    numScanners: 1,
                    scanners: [
                        {
                            number: 1,
                            text: "",
                            type: $scope.gameTypes[0]
                        }
                    ]
                };

                $scope.locations.push(locationTemplate);
                counter++
            }
        } else {
            for (var i = 0; i < -changeValue; i++) {
                $scope.locations.pop();
            }
        }

        if (!$scope.selectedLoc.number || $scope.selectedLoc.number > newValue) {
            $scope.selectedLoc = $scope.locations[newValue - 1];
        }
    };

    $scope.updateScanners = function(newValue, oldValue) {
        var changeValue = newValue - oldValue;
        if (changeValue >= 0) {
            var counter = Number(oldValue) + 1;
            while (counter <= newValue) {
                var scannerTemplate = {
                    number: counter,
                    text: "",
                    type: $scope.gameTypes[0]
                };

                $scope.selectedLoc.scanners.push(scannerTemplate);
                counter++
            }
        } else {
            for (var i = 0; i < -changeValue; i++) {
                $scope.selectedLoc.scanners.pop();
            }
        }

        if (!$scope.selectedScanner.number || $scope.selectedScanner.number > newValue) {
            $scope.selectedScanner = $scope.selectedLoc.scanners[newValue - 1];
        }
    };

    $scope.$watch("selectedLoc", function() {
        $scope.selectedScanner = $scope.selectedLoc.scanners[0];
    });

    $scope.updateGame = function() {

        var game = {
            name: $scope.gameName,
            locations: $scope.locations
        };

        /*
        $http({
            method: "POST",
            url: "/api/create-game",
            data: game
        }).then(function success(res) {
            console.log(res);
            $state.transitionTo('admin');
        }, function error(res) {
            console.log("ERROR " + res);
        });
        */

    };






}]);