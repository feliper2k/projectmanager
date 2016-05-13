import { includes, omit, assign } from 'lodash';
import toastr                 from 'toastr';

function TasksSingleCtrl(ProjectService, UserService, TaskService, $window, $stateParams, $state, $rootScope) {
    'ngInject';

    // ViewModel
    const vm = this;

    const taskId = $stateParams.id;
    vm.current = TaskService.all.get({ id: taskId });
    vm.owners = UserService.query();
    // vm.owners = UserService.query();
    // vm.tasks = TaskService;
    // vm.tasksByProject = TaskService.byProject(projectId);

    vm.editor = {
        visible: false
    };

    vm.addForm = {
        visible: false
    };

    vm.newItem = {};

    vm.actions =  {
        save() {
            // let item = omit(vm.current, ['dldate', 'dltime', 'ownername', 'progress']);

            vm.current.$update(() => {
                $state.go('TasksSingle', $stateParams, { reload: true });
            });
        },

        markAs(status) {
            if(includes(['new', 'in progress', 'done'], status)) {
                vm.current.status = status;
                this.save();
            }
        },

        deleteTask() {
            if(window.confirm('Czy na pewno?')) {
                vm.current.$delete(() => {
                    $state.go('ProjectSingle', { id: vm.current.project }, { reload: true });
                });
            }
        }
        //
        //
        // addItem() {
        //     let newEntry = assign(vm.newItem, {
        //         project: projectId
        //     });
        //
        //     new TaskService.all(newEntry).$save(success => {
        //         $rootScope.$broadcast('tableViewUpdateRequest');
        //         vm.addForm.visible = false;
        //         toastr.info(`Dodano zadanie.`);
        //     },
        //     error => {
        //         toastr.error(`Błąd: ${error.message}`);
        //     });
        // }*/
    }
}

export default {
    name: 'TasksSingleCtrl',
    fn: TasksSingleCtrl
};
