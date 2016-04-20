function UserService($http, $resource, ConfigService) {
    'ngInject';

    const apiPrefix = ConfigService.apiPrefix;

    const User = $resource(`${apiPrefix}/api/users/:id`, { id: '@id' }, {
        update: {
            method: 'PUT' // this method issues a PUT request
        }
    });

    return User;
}

export default {
    name: 'UserService',
    fn: UserService
};
