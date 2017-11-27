rfidApp.directive("error", function() {
    return {
        templateUrl: "/assets/js/directives/error/error.html",
        controller: function($scope, $state) {
            $scope.reload = function() {
                $state.reload();
            }
        }
    };
});