import { find, pick } from 'lodash';

function ProjectsViewCtrl(ProjectService, $scope, $window, $http) {
    'ngInject';

    // ViewModel
    const vm = this;

    // vm.list = ProjectService.query();
    // ProjectService.query((content, headersFn) => {
    //     vm.list = content;
    //     // console.log(headersFn());
    //     vm.totalCount = headersFn('x-total-count');
    // });

    vm.list = ProjectService;
    vm.newItem = {};

    vm.addForm = {
        visible: false
    };

    vm.actions = {
        add() {
            // concatenate date fields
            vm.newItem.duedate = [vm.newItem.dldate, vm.newItem.dltime].join(' ');

            let item = pick(vm.newItem, ['owner', 'name', 'description', 'duedate']);

            ProjectService.save(item).$promise
            .then(success => {
                $scope.$broadcast('tableViewUpdateRequest');
                vm.addForm.visible = false;
                vm.newItem = {};
            });
        },

        save(projectId) {
            let savedItem = find(vm.list, (project) => project.id === projectId);

            savedItem.$update((success) => {
                vm.list = ProjectService.query();
            });
        }
    }
}

export default {
    name: 'ProjectsViewCtrl',
    fn: ProjectsViewCtrl
};
