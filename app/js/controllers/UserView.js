import { find } from 'lodash';
import toastr   from 'toastr';

function UserViewCtrl(UserService, $window, $rootScope) {
    'ngInject';

    // ViewModel
    const vm = this;

    vm.list = UserService;
    vm.newUser = {};

    vm.addForm = {
        visible: false
    };

    vm.actions = {
        remove(userRsrc) {
            if(!$window.confirm('Czy na pewno?')) return;

            userRsrc.$remove(success => {
                $rootScope.$broadcast('tableViewUpdateRequest');
            },
            error => {
                toastr.error(`Błąd: ${error.data.message}`)
            });
        },

        add() {
            return UserService.save(vm.newUser).$promise
            .then(success => {
                $rootScope.$broadcast('tableViewUpdateRequest');
            })
            .catch(error => {
                toastr.error(`Błąd: ${error.data.message}`);
            });
        },

        save(userRsrc) {
            userRsrc.$update(success => {
                $rootScope.$broadcast('tableViewUpdateRequest');
            },
            error => {
                toastr.error(`Błąd: ${error.data.message}`);
            });
        }
    }
}

export default {
    name: 'UserViewCtrl',
    fn: UserViewCtrl
};
