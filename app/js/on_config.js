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
    .state('UsersMgmt', {
        url: '/manage/users',
        controller: 'UserViewCtrl as users',
        templateUrl: 'users.html',
        title: 'Zarządzaj użytkownikami'
    })
    .state('ProjectsMgmt', {
        url: '/manage/projects',
        controller: 'ProjectsViewCtrl as projects',
        templateUrl: 'projects.html',
        title: 'Zarządzaj projektami'
    })
    .state('Chat', {
        url: '/chat',
        controller: 'ProjectsViewCtrl as chat',
        templateUrl: 'chat.html',
        title: 'Chat'
    });

    $urlRouterProvider.otherwise('/manage/users');
    // $urlRouterProvider.otherwise('/login');

    // authentication interceptor - self-contained service
    $httpProvider.interceptors.push('AuthenticationService');
}

export default OnConfig;
