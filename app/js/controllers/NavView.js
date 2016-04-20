function NavigationViewCtrl(UserService, $window) {
    'ngInject';

    // ViewModel
    const vm = this;

    vm.menu = [{
        targetState: 'UsersMgmt',
        label: 'Użytkownicy',
        icon: 'users'
    },
    {
        targetState: 'ProjectsList',
        label: 'Projekty',
        icon: 'tasks'
    },
    {
        targetState: 'Chat',
        label: 'Czat',
        icon: 'commenting-o'
    }];
}

export default {
    name: 'NavigationViewCtrl',
    fn: NavigationViewCtrl
};
