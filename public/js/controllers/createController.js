rfidApp.controller('createController', ['$scope', function($scope) {
    $scope.gameTypes = [
        "Standard",
        "Voting",
        "Question"
    ];

    $scope.gameType = "Standard";

}]);