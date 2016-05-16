'use strict';

function FileSelector($parse) {
    'ngInject';

    let $ = require('jquery');
    function link(scope, element, attrs) {
        let $elem = $(element);

        $elem.on('change', function (event) {
            let model = $parse(attrs.fileSelector);
            let fd = new FormData();

            fd.append($elem[0].name, $elem[0].files[0]);
            model.assign(scope, fd);

            scope.$emit('fileChanged');
        });
    }

    return {
        restrict: 'A',
        scope: true,
        link
    };
}

export default {
    name: 'fileSelector',
    fn: FileSelector
};
