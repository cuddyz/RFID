rfidApp.config(function($stateProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    var homeState = {
        name: 'home',
        url: '/',
        template: '<h3>Home!</h3>'
    };

    var scannerState = {
        name: 'scanner',
        url: '/scanner',
        template: '<h3>Scanner!</h3>'
    };

    var resultState = {
        name: 'result',
        url: '/result',
        template: '<h3>Result!</h3>'
    };

    var adminState = {
        name: 'admin',
        url: '/admin',
        template: '<h3>Admin!</h3>'
    };

    $stateProvider.state(homeState);
    $stateProvider.state(scannerState);
    $stateProvider.state(resultState);
    $stateProvider.state(adminState);

});