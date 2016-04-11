function LoginCtrl(LoginService, $state) {
    'ngInject';

    // ViewModel
    const vm = this;

    vm.data = {
        // userName, userPass
    };

    vm.signIn = function() {
        LoginService.signIn(vm.data)
        .then((payload) => {
            $state.go('UsersList');
        })
        .catch((error) => {
            vm.error = error;
        });
    };
}

export default {
    name: 'LoginCtrl',
    fn: LoginCtrl
};
