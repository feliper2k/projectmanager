import { find } from 'lodash';

function ChatWindowViewCtrl(Messages) {
    'ngInject';

    const vm = this;

    vm.messages = Messages;
}

export default {
    name: 'ChatWindowViewCtrl',
    fn: ChatWindowViewCtrl
};
