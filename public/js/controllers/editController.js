rfidApp.controller('editController', ['$scope', 'CurrentGame', '$http', '$state', function($scope, CurrentGame, $http, $state) {
    $scope.gameRunning = false;
    $scope.loading = true;

    $scope.gameTypes = [
        "Standard",
        "Voting",
        "Question"
    ];

    CurrentGame.get().$promise.then(function success(data) {
        console.log(data);
        $scope.game = data;
        $scope.loading = false;
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
                    type: $scope.selectedScanner.type
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
        if ($scope.selectedLoc) {
            $scope.selectedScanner = $scope.selectedLoc.scanners[0];
        }
    });

    $scope.$watch("selectedScanner.type", function() {
        if ($scope.selectedLoc) {
            for (var i = 0; i < $scope.selectedLoc.scanners.length; i++) {
                $scope.selectedLoc.scanners[i].type = $scope.selectedScanner.type;
            }
        }
    });

    $scope.updateGame = function() {
        var game = {
            name: $scope.gameName,
            locations: $scope.locations,
            id: $scope.game._id
        };

        $http({
            method: "PUT",
            url: "/api/edit-game",
            data: game
        }).then(function success(res) {
            console.log(res);
            $state.transitionTo('admin');
        }, function error(res) {
            console.log("ERROR " + res);
        });
    };

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