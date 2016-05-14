import { find, map, assign, findIndex } from 'lodash';
import $        from 'jquery';
import toastr   from 'toastr';

function ChatViewCtrl(ChatService, UserService, LoginService, ChatSocket, $window, $state, $rootScope) {
    'ngInject';

    const socket = ChatSocket;

    const token = LoginService.tokenData();
    const groupsByUser = ChatService.groups.byUser;
    const groupsAll = ChatService.groups.all;
    const users = UserService.query();

    // ViewModel
    const vm = this;
    vm.users = function () {
        return users.filter(user => user.id !== token.userid);
    };

    function updateGroups() {
        groupsByUser.query({ uid: token.userid }, groups => {
            vm.groups = groups.reverse();
        });
    }

    updateGroups();

    // conversation selector
    const cnvs = $('#newConversationSelect');
    cnvs.on('change', function (event) {
        // console.log(event.target.selectedOptions[0].value);
        const selectedNodes = event.target.selectedOptions;
        const recipients = map(selectedNodes, option => option.value);
        recipients.push(token.userid);

        groupsAll.save({ recipients }, newGroup => {
            $state.go('Chat.Message', { gid: newGroup.insertId });
            socket.emit('newGroup', { group: newGroup.insertId })
        },
        error => {
            toastr.error(error.message);
        });

        event.target.selectedIndex = 0;
    });

    // $state.params.gid -> when posting
    vm.newMessage = {};
    vm.actions = {
        postMessage() {
            const targetGroup = $state.params.gid;

            assign(vm.newMessage, {
                group: targetGroup,
                sent: new Date().toISOString()
            });

            return new Promise((resolve, reject) => {
                ChatService.messages.save(vm.newMessage, success => {
                    socket.emit('newMessage', { sender: token.userid, group: targetGroup })
                    resolve(success);
                },
                error => {
                    toastr.error(error.message);
                    reject(error);
                });
            });
        }
    };

    function hasGroup(groupId) {
        return find(vm.groups, group => group.groupid == groupId);
    }

    // chat push
    socket.on('newGroup', data => {
        // if(hasGroup(data.group)) {
            updateGroups();
        // }
    });

    // handle unread messages in view
    socket.on('newMessage', data => {
        if(data.group != $state.params.gid) {
            const notifiedGroup = find(vm.groups, g => g.groupid == data.group);
            if(notifiedGroup) {
                notifiedGroup.unread = true;
            }
        }
    })

    $rootScope.$on('$stateChangeSuccess', () => {
        const notifiedGroup = find(vm.groups, g => g.groupid == $state.params.gid);
        if(notifiedGroup) {
            notifiedGroup.unread = false;
        }
    });
}

export default {
    name: 'ChatViewCtrl',
    fn: ChatViewCtrl
};
