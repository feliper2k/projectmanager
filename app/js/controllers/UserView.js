import { find } from 'lodash';
import toastr   from 'toastr';

function UserViewCtrl(UserService, $window) {
    'ngInject';

    // ViewModel
    const vm = this;

    vm.list = UserService;
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
            })
            .catch(error => toastr.error(`Błąd: ${error.data.message}`));
        },

        add() {
            UserService.save(vm.newUser).$promise
            .then((success) => {
                vm.list = UserService.query();
            })
            .catch(error => {
                toastr.error(`Błąd: ${error.data.message}`);
            });
        },

        save(userId) {
            let savedItem = find(vm.list, (user) => user.id === userId);

            savedItem.$update(success => {
                vm.list = UserService.query();
            },
            error => toastr.error(`Błąd: ${error.data.message}`));
        }
    }
}

export default {
    name: 'UserViewCtrl',
    fn: UserViewCtrl
};
