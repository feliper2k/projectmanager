import { find } from 'lodash';

function UserViewCtrl(UserService, $window) {
    'ngInject';

    // ViewModel
    const vm = this;

    vm.list = UserService.query();
    vm.newUser = {};

    vm.addForm = {
        visible: false
    };

    vm.actions = {
        remove(userId) {
            if(!$window.confirm('Czy na pewno?')) return;

            UserService.remove({ id: userId }).$promise
            .then((success) => {
                vm.list = UserService.query();
            });
        },

        add() {
            UserService.save(vm.newUser).$promise
            .then((success) => {
                vm.list = UserService.query();
            });
        },

        save(userId) {
            let savedItem = find(vm.list, (user) => user.id === userId);

            savedItem.$update((success) => {
                vm.list = UserService.query();
            });
        }
    }
}

export default {
    name: 'UserViewCtrl',
    fn: UserViewCtrl
};
