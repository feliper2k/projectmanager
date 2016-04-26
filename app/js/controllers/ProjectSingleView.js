import { find, omit } from 'lodash';

function ProjectsSingleCtrl(ProjectService, UserService, TaskService, $window, $stateParams, $state) {
    'ngInject';

    // ViewModel
    const vm = this;

    const projectId = $stateParams.id;
    vm.current = ProjectService.get({ id: projectId });
    vm.owners = UserService.query();
    vm.tasks = TaskService;

    vm.editor = {
        visible: false
    };

    vm.actions =  {
        save() {
            let item = omit(vm.current, ['dldate', 'dltime', 'ownername', 'progress']);

            new ProjectService(item).$update(() => {
                $state.go('ProjectsSingle', $stateParams, { reload: true });
            });
        }
    }
}

export default {
    name: 'ProjectsSingleCtrl',
    fn: ProjectsSingleCtrl
};
