import { find } from 'lodash';
import $        from 'jquery';
import toastr   from 'toastr';


function ChatWindowViewCtrl(Messages, ChatSocket, ChatService, $stateParams, $scope) {
    'ngInject';

    const vm = this;
    const socket = ChatSocket;
    const chatWindow = $('.view__chat-window');

    $scope.$watch(() => chatWindow.prop('scrollHeight'), scrollToBottom);

    Messages.$promise.then(messages => {
        vm.messages = messages;
    });

    function hasGroup(groupId) {
        return find($scope.chat.groups, group => group.groupid == groupId);
    }

    function scrollToBottom() {
        const maxScroll = chatWindow.prop('scrollHeight') - chatWindow.height();
        chatWindow.animate({ scrollTop: maxScroll }, 'slow');
    }

    socket.on('newMessage', data => {
        if(hasGroup(data.group)) {
            const MessageRequest = ChatService.groups.all.query({ gid: $stateParams.gid });

            MessageRequest.$promise.then(messages => {
                vm.messages = messages;
            });
        }
    });
}

export default {
    name: 'ChatWindowViewCtrl',
    fn: ChatWindowViewCtrl
};
