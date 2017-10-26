rfidApp.config(function($stateProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    var homeState = {
        name: 'home',
        url: '/',
        templateUrl: "/assets/views/home.html"
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

    $stateProvider.state(homeState);
    $stateProvider.state(scannerState);
    $stateProvider.state(resultState);
    $stateProvider.state(adminState);

});