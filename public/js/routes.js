rfidApp.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function($stateProvider, $locationProvider, $urlRouterProvider) {

    $locationProvider.html5Mode(true);

    var homeState = {
        name: 'home',
        url: '/',
        templateUrl: "/assets/views/home.html",
        controller: "homeController"
    };

    var scannersState = {
        name: 'scanners',
        url: '/scanners',
        templateUrl: "/assets/views/scanners.html",
        controller: "scannersController"
    };

    var scanState = {
        name: 'scan',
        url: '/scanners/:locNum',
        templateUrl: "/assets/views/scan.html",
        controller: "scanController"
    };

    var resultState = {
        name: 'result',
        url: '/result',
        templateUrl: "/assets/views/result.html"
    };

    var adminState = {
        name: 'admin',
        url: '/admin',
        templateUrl: "/assets/views/admin.html",
        controller: "adminController"
    };

    var createState = {
        name: 'create',
        url: '/create',
        templateUrl: "/assets/views/create.html",
        controller: "createController"
    };

    var editState = {
        name: 'edit',
        url: '/edit',
        templateUrl: "/assets/views/edit.html",
        controller: "editController"
    };

    var userState = {
        name: 'user',
        url: '/user',
        templateUrl: "/assets/views/user.html",
        controller: "userController"
    };

    $stateProvider.state(homeState);
    $stateProvider.state(scannersState);
    $stateProvider.state(scanState);
    $stateProvider.state(resultState);
    $stateProvider.state(adminState);
    $stateProvider.state(createState);
    $stateProvider.state(editState);
    $stateProvider.state(userState);

    $urlRouterProvider.otherwise('/');

}]);