function OnConfig($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider) {
    'ngInject';

    $locationProvider.html5Mode(false);

    $stateProvider
    .state('Login', {
        url: '/login',
        controller: 'LoginCtrl as login',
        templateUrl: 'login.html',
        title: 'Zaloguj się'
    })
    .state('UsersList', {
        url: '/manage/users',
        controller: 'UserViewCtrl as users',
        templateUrl: 'users.html',
        title: 'Zarządzaj użytkownikami'
    });

    $urlRouterProvider.otherwise('/manage/users');
    // $urlRouterProvider.otherwise('/login');

    // authentication interceptor - self-contained service
    $httpProvider.interceptors.push('AuthenticationService');
}

export default OnConfig;
