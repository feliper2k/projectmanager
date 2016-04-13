function MainCtrl(LoginService) {
    'ngInject';

    // ViewModel
    const vm = this;

    vm.login = LoginService;
    vm.tokenData = LoginService.tokenData;
}

export default {
    name: 'MainCtrl',
    fn: MainCtrl
};
