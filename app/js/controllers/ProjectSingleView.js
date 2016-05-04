import { find, omit, assign } from 'lodash';
import toastr                 from 'toastr';

function ProjectsSingleCtrl(ProjectService, UserService, TaskService, $window, $stateParams, $state, $rootScope) {
    'ngInject';

    // ViewModel
    const vm = this;

    const projectId = $stateParams.id;
    vm.current = ProjectService.get({ id: projectId });
    vm.owners = UserService.query();
    vm.tasks = TaskService;
    vm.tasksByProject = TaskService.byProject(projectId);

    vm.editor = {
        visible: false
    };

    vm.addForm = {
        visible: false
    };

    vm.newItem = {};

    vm.actions =  {
        save() {
            let item = omit(vm.current, ['dldate', 'dltime', 'ownername', 'progress']);

            new ProjectService(item).$update(() => {
                $state.go('ProjectsSingle', $stateParams, { reload: true });
            });
        },

        addItem() {
            let newEntry = assign(vm.newItem, {
                project: projectId
            });

            new TaskService.all(newEntry).$save(success => {
                $rootScope.$broadcast('tableViewUpdateRequest');
                vm.addForm.visible = false;
                toastr.info(`Dodano zadanie.`);
            },
            error => {
                toastr.error(`Błąd: ${error.message}`);
            });
        }
    }
}

export default {
    name: 'ProjectsSingleCtrl',
    fn: ProjectsSingleCtrl
};
