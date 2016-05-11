function ChatService($http, $resource, ConfigService) {
    'ngInject';

    const apiPrefix = ConfigService.apiPrefix;

    return {
        messages: $resource(`${apiPrefix}/api/messages/:id`, { id: '@id' }),

        groups: {
            all: $resource(`${apiPrefix}/api/messages/groups/:gid`, { gid: '@gid' }),
            byUser: $resource(`${apiPrefix}/api/messages/groups/byUser/:uid`, { uid: '@uid' })
        }
    };
}

export default {
    name: 'ChatService',
    fn: ChatService
};
