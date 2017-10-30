rfidApp.controller('createController', ['$scope', function($scope) {

    $scope.gameType = "Standard";
    $scope.numLocations = 1;
    $scope.selectedLoc = "";

    $scope.gameTypes = [
        "Standard",
        "Voting",
        "Question"
    ];

    $scope.locNames = [];

    $scope.$watch('numLocations', function(newValue, oldValue) {
        if (newValue - oldValue >= 0) {
            var locationTemplate = {
                id: newValue,
                name: ""
            };

            $scope.locNames.push(locationTemplate);
        } else {
            $scope.locNames.pop();
        }

        if (!$scope.selectedLoc.id || $scope.selectedLoc.id > newValue) {
            $scope.selectedLoc = $scope.locNames[newValue - 1];
        }
    });

}]);