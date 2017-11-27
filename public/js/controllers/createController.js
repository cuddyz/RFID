rfidApp.controller('createController', ['$scope', '$http', '$state', 'CurrentGame', function($scope, $http, $state, CurrentGame) {
    $scope.gameRunning = false;
    $scope.loading = true;

    CurrentGame.get().$promise.then(function success(data) {
        console.log(data);
        $scope.loading = false;
        if (data.active) {
            $scope.gameRunning = true;
        }
    }, function error(res) {
        console.log("ERROR " + res);
        $scope.error = true;
    });

    $scope.gameName = "";
    $scope.numLocations = 1;
    $scope.numScanners = 1;
    $scope.locations = [];

    $scope.gameTypes = [
        "Standard",
        "Voting",
        "Question"
    ];

    var locationTemplate = {
        number: 1,
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
    $scope.selectedLoc = $scope.locations[0];

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
        $scope.selectedScanner = $scope.selectedLoc.scanners[0];
    });

    $scope.$watch("selectedScanner.type", function() {
        if ($scope.selectedLoc) {
            for (var i = 0; i < $scope.selectedLoc.scanners.length; i++) {
                $scope.selectedLoc.scanners[i].type = $scope.selectedScanner.type;
            }
        }
    });

    $scope.createGame = function() {

        var game = {
            name: $scope.gameName,
            locations: $scope.locations
        };

        $http({
            method: "POST",
            url: "/api/create-game",
            data: game
        }).then(function success(res) {
            console.log(res);
            $state.transitionTo('admin');
        }, function error(res) {
            console.log("ERROR " + res);
            $scope.error = true;
        });

    };

}]);