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
    .state('ProjectsList', {
        url: '/manage/projects',
        controller: 'ProjectsViewCtrl as projects',
        templateUrl: 'projects-list.html',
        title: 'Zarządzaj projektami'
    })
    .state('ProjectsSingle', {
        url: '/manage/projects/:id',
        controller: 'ProjectsSingleCtrl as project',
        templateUrl: 'projects-single.html',
        title: 'Edytuj projekt'
    })
    .state('Chat', {
        url: '/chat',
        controller: 'ChatViewCtrl as chat',
        templateUrl: 'chat.html',
        title: 'Czat'
    })
    .state('Chat.Message', {
        url: '/messages/:gid',
        // controller: 'ChatWindowViewCtrl as chatwin',
        templateUrl: 'chat-window.html'
    });

    $urlRouterProvider.otherwise('/manage/users');
    // $urlRouterProvider.otherwise('/login');

    // authentication interceptor - self-contained service
    $httpProvider.interceptors.push('AuthenticationService');
}

export default OnConfig;
