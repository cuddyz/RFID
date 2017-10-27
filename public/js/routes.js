rfidApp.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function($stateProvider, $locationProvider, $urlRouterProvider) {

    $locationProvider.html5Mode(true);

    var homeState = {
        name: 'home',
        url: '/',
        templateUrl: "/assets/views/home.html",
        controller: "homeController"
    };

    var scannerState = {
        name: 'scanner',
        url: '/scanner',
        templateUrl: "/assets/views/scanner.html"
    };

    var resultState = {
        name: 'result',
        url: '/result',
        templateUrl: "/assets/views/result.html"
    };

    var adminState = {
        name: 'admin',
        url: '/admin',
        templateUrl: "/assets/views/admin.html"
    };

    var createState = {
        name: 'create',
        url: '/create',
        templateUrl: '/assets/views/create.html'
    };

    $stateProvider.state(homeState);
    $stateProvider.state(scannerState);
    $stateProvider.state(resultState);
    $stateProvider.state(adminState);
    $stateProvider.state(createState);

    $urlRouterProvider.otherwise('/');

}]);