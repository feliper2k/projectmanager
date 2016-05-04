'use strict';

import toastr   from 'toastr';

const ERROR_MESSAGES = {
    401: 'Sesja wygasła lub nieprawidłowy token sesji',
    403: 'Brak dostępu!',
    404: 'Problem z połączeniem z API',
    500: 'Wewnętrzny błąd serwera API'
};

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
            let errorMessage;

            if(errorMessage = ERROR_MESSAGES[response.status]) {
                toastr.error(errorMessage);
            }

            $location.path('/login');
            return $q.reject(response);
        }
    };
};

export default {
    name: 'AuthenticationService',
    fn: AuthenticationService
};
