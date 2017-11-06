rfidApp.controller('createController', ['$scope', function($scope) {

    $scope.gameType = "Standard";
    $scope.numLocations = 1;
    $scope.numScanners = 1;
    $scope.locNames = [];

    var locationTemplate = {
        id: 1,
        name: ""
    };

    $scope.locNames.push(locationTemplate);
    $scope.selectedLoc = $scope.locNames[0];

    $scope.gameTypes = [
        "Standard",
        "Voting",
        "Question"
    ];

    $scope.updateLocations = function(newValue, oldValue) {
        var changeValue = newValue - oldValue;
        if (changeValue >= 0) {
            var counter = Number(oldValue) + 1;
            while (counter <= newValue) {
                var locationTemplate = {
                    id: counter,
                    name: ""
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

}]);