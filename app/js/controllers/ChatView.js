import { find } from 'lodash';

function ChatViewCtrl(ChatService, LoginService, $window, $rootScope) {
    'ngInject';

    const token = LoginService.tokenData();
    const groupsByUser = ChatService.groups.byUser;
    const groupsAll = ChatService.groups.all;


    // ViewModel
    const vm = this;

    function updateGroups() {
        groupsByUser.query({ uid: token.userid }, groups => {
            vm.groups = groups;
        });
    }

    updateGroups();
}

export default {
    name: 'ChatViewCtrl',
    fn: ChatViewCtrl
};
