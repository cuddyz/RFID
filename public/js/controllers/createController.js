rfidApp.controller('createController', ['$scope', function($scope) {

    $scope.gameType = "Standard";
    $scope.numLocations = 1;

    $scope.gameTypes = [
        "Standard",
        "Voting",
        "Question"
    ];


}]);