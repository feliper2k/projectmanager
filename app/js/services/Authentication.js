'use strict';

import toastr from 'toastr';

function AuthenticationService($q, $window, $location) {
    'ngInject';

    return {
        request: function (config) {
            const token = $window.localStorage.getItem('token');

            config.headers = config.headers || {};
            if (token) {
                config.headers['X-Access-Token'] = token;
            }
            return config;
        },
        responseError: function (response) {
            if (response.status === 401) {
                toastr.error('Brak dostępu!');
                $location.path('/login');
            }
            return $q.reject(response);
        }
    };
};

export default {
    name: 'AuthenticationService',
    fn: AuthenticationService
};
