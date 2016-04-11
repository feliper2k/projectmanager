function UserService($http, $resource) {
    'ngInject';

    const User = $resource('/api/users/:id', { id: '@id' }, {
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
