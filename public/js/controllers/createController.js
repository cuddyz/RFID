rfidApp.controller('createController', ['$scope', function($scope) {
    $scope.gameTypes = [
        "Standard",
        "Voting",
        "Question"
    ];

    //Insert HTTP DB call to check if a game is calling
    //If so set the gameRunning = true;
}]);