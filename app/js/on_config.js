import io       from 'socket.io-client';

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
    .state('TasksSingle', {
        url: '/manage/tasks/:id',
        controller: 'TasksSingleCtrl as task',
        templateUrl: 'tasks-single.html',
        title: 'Edytuj zadanie'
    })
    .state('Chat', {
        url: '/chat',
        controller: 'ChatViewCtrl as chat',
        templateUrl: 'chat.html',
        resolve: {
            ChatSocket($q) {
                'ngInject';

                const socket = io.connect('http://localhost:8001');

                return new Promise((resolve, reject) => {
                    socket.on('connect', () => {
                        resolve(socket);
                    });
                    socket.on('error', (data) => {
                        reject(data);
                        console.log(data);
                    });

                });
            }
        },
        title: 'Czat'
    })
    .state('Chat.Message', {
        url: '/messages/:gid',
        controller: 'ChatWindowViewCtrl as chatwin',
        templateUrl: 'chat-window.html',
        resolve: {
            Messages(ChatService, $stateParams) {
                'ngInject';

                return ChatService.groups.all
                    .query({ gid: $stateParams.gid }).$promise;
            }
        }
    });

    $urlRouterProvider.otherwise('/manage/users');
    // $urlRouterProvider.otherwise('/login');

    // authentication interceptor - self-contained service
    $httpProvider.interceptors.push('AuthenticationService');
}

export default OnConfig;
