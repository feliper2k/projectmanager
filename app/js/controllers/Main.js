function MainCtrl(LoginService) {
    'ngInject';

    // ViewModel
    const vm = this;

    vm.login = LoginService;
}

export default {
    name: 'MainCtrl',
    fn: MainCtrl
};
