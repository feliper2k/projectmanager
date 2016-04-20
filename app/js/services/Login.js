'use strict';
const jwt = require('jsonwebtoken');

function LoginService($http, $window, $state, $q, UserService, ConfigService) {
    'ngInject';

    let token = $window.localStorage.getItem('token');
    const apiPrefix = ConfigService.apiPrefix;

    return {
        signIn(loginData) {
            return $http.post(`${apiPrefix}/auth`, loginData).then((res) => {
                token = res.data.token;
                $window.localStorage.setItem('token', token);

                return this.tokenData();       // token payload
            });
        },

        signOut() {
            $window.localStorage.removeItem('token');
            $state.go('Login');
        },

        tokenData() {
            // returns decoded token payload
            if(token)   return jwt.decode(token);

            return false;
        },

        currentUser() {
            if(token) {
                const userId = this.tokenData().userid;
                return UserService.get(userId).$promise;
            }

            return Promise.reject('Not logged in');
        }
    };
}

export default {
    name: 'LoginService',
    fn: LoginService
};
