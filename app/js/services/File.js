'use strict';

import { assign } from 'lodash';

function FileService($http, $resource, ConfigService) {
    'ngInject';

    const apiPrefix = ConfigService.apiPrefix;

    const Files = $resource(`${apiPrefix}/api/projects/:id/files/`, { id: '@id' }, {
        update: {
            method: 'PUT' // this method issues a PUT request
        }
    });

    function upload({ id, fileData }) {
        const req = {
            method: 'POST',
            url: `${apiPrefix}/api/projects/${id}/files/`,
            data: fileData,
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        };

        return $http(req);
    }

    function deleteFile(fileId) {
        const fileRes = $resource(`${apiPrefix}/api/files/:id`, { id: '@id' });
        return fileRes.remove({ id: fileId }).$promise;
    }

    return assign(Files, {
        upload,
        deleteFile
    });
}

export default {
    name: 'FileService',
    fn: FileService
};
