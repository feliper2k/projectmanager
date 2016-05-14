import $ from 'jquery';

function ChatTextbox() {
    'ngInject';

    function link(scope, element, attrs) {
        const textbox = $(element);

        textbox.on('keydown', function (event) {
            if(event.keyCode === 13 && !event.shiftKey) {
                scope.action(event).then(() => {
                    textbox.val('');
                });
            }
        });
    }

    return {
        restrict: 'A',
        scope: {
            action: '&chatTextbox'
        },
        link
    };
}

export default {
  name: 'chatTextbox',
  fn: ChatTextbox
};
