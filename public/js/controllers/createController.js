rfidApp.controller('createController', ['$scope', function($scope) {

    $scope.numLocations = 1;
    $scope.numScanners = 1;
    $scope.locNames = [];

    $scope.gameTypes = [
        "Standard",
        "Voting",
        "Question"
    ];

    var locationTemplate = {
        id: 1,
        name: "",
        numScanners: 1,
        scanners: [
            {
                id: 1,
                text: "",
                type: $scope.gameTypes[0]
            }
        ]
    };

    $scope.locNames.push(locationTemplate);
    $scope.selectedLoc = $scope.locNames[0];

    $scope.updateLocations = function(newValue, oldValue) {
        var changeValue = newValue - oldValue;
        if (changeValue >= 0) {
            var counter = Number(oldValue) + 1;
            while (counter <= newValue) {
                var locationTemplate = {
                    id: counter,
                    name: "",
                    numScanners: 1,
                    scanners: [
                        {
                            id: 1,
                            text: "",
                            type: $scope.gameTypes[0]
                        }
                    ]
                };

                $scope.locNames.push(locationTemplate);
                counter++
            }
        } else {
            for (var i = 0; i < -changeValue; i++) {
                $scope.locNames.pop();
            }
        }

        if (!$scope.selectedLoc.id || $scope.selectedLoc.id > newValue) {
            $scope.selectedLoc = $scope.locNames[newValue - 1];
        }
    };

    $scope.updateScanners = function(newValue, oldValue) {
        var changeValue = newValue - oldValue;
        if (changeValue >= 0) {
            var counter = Number(oldValue) + 1;
            while (counter <= newValue) {
                var scannerTemplate = {
                    id: counter,
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

        if (!$scope.selectedScanner.id || $scope.selectedScanner.scanner.id > newValue) {
            $scope.selectedScanner = $scope.selectedLoc.scanners[newValue - 1];
        }
    };

    $scope.$watch("selectedLoc", function() {
        $scope.selectedScanner = $scope.selectedLoc.scanners[0];
    })
}]);