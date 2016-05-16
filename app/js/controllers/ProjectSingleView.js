import { find, omit, assign } from 'lodash';
import toastr                 from 'toastr';

function ProjectsSingleCtrl(ProjectService, UserService, TaskService, FileService,
     $window, $stateParams, $state, $http, $rootScope) {
    'ngInject';

    // ViewModel
    const vm = this;

    const projectId = $stateParams.id;
    vm.current = ProjectService.get({ id: projectId });
    vm.owners = UserService.query();
    vm.tasks = TaskService;
    vm.tasksByProject = TaskService.byProject(projectId);

    vm.filesByProject = FileService.query({ id: projectId });

    vm.editor = {
        visible: false
    };

    vm.addForm = {
        visible: false
    };

    vm.newItem = {};
    vm.newFile = null;

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
        },

        addFile() {
            FileService.upload({ id: projectId, fileData: vm.newFile }).then(success => {
                 vm.filesByProject = FileService.query({ id: projectId });
            }, error => {
                toastr.error(error);
            });
        },

        deleteFile(file) {
            if(window.confirm('Czy na pewno?')) {
                FileService.deleteFile(file.id)
                .then(success => {
                     vm.filesByProject = FileService.query({ id: projectId });
                }, error => {
                    toastr.error(error);
                });
            }
        },

        deleteProject() {
            if(window.confirm('Czy na pewno?')) {
                vm.current.$delete(() => {
                    $state.go('ProjectsList', {}, { reload: true });
                });
            }
        }
    }
}

export default {
    name: 'ProjectsSingleCtrl',
    fn: ProjectsSingleCtrl
};
