function ProjectService($http, $resource, ConfigService) {
    'ngInject';

    const apiPrefix = ConfigService.apiPrefix;

    const Project = $resource(`${apiPrefix}/api/projects/:id`, { id: '@id' }, {
        update: {
            method: 'PUT' // this method issues a PUT request
        }
    });

    return Project;
}

export default {
    name: 'ProjectService',
    fn: ProjectService
};
