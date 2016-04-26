function TaskService($http, $resource, ConfigService) {
    'ngInject';

    const apiPrefix = ConfigService.apiPrefix;

    const byProject = $resource(`${apiPrefix}/api/project/:pid/tasks/`, { pid: '@pid' });
    const all = $resource(`${apiPrefix}/api/tasks/:id`, { id: '@id' });

    return {
        byProject,
        all
    };
}

export default {
    name: 'TaskService',
    fn: TaskService
};
