'use strict';

const CRUD = require('./crud');
const MESSAGES = require('./utils').MESSAGES;

const ChatMessages = CRUD('messages');
const ChatMessagesView = CRUD('messages-view');
const ChatMessagesGroups = CRUD('messages-groups');
const ChatMessagesGroupsView = CRUD('messages-groups-view');
const ChatMessagesMembers = CRUD('messages-groups-members');
const _ = require('lodash');

function sanitizeBody(req, res, next) {
    // an array of columns whitelisted (i.e. included) in create/update routines
    const PURE_COLUMNS = [
        'id', 'userid', 'groupid', 'groupname', 'sender',
        'receiver', 'group', 'text', 'sent', 'received'
    ];

    if(_.includes(['POST', 'PUT'], req.method)) {
        req.body = _.pick(req.body, PURE_COLUMNS);
    }
    next();
}

function getMessageGroup(req, res) {
    const limit = req.query.limit || null;
    const groupId = parseInt(req.params.gid) || null;
    const constraint = groupId ? [`\`group\` = ${groupId}`] : null;

    ChatMessagesView.find(constraint, limit).then(matches => res.json(matches));

    // Messages.totalCount(projectId).then(count => {
    //     res.set({
    //         'X-Total-Count': count
    //     });
    //
    //     return Users.find(null, limit);
    // })
}

function getMessageGroupsByUser(req, res) {
    const userId = req.params.uid ? parseInt(req.params.uid) : null;
    const filter = [`userid = ${userId}`];

    if(Number.isInteger(userId)) {
        ChatMessagesMembers.findDistinct(filter, null, ['groupid'])
        .then(matches => matches.map(g => ChatMessagesGroupsView.find([`groupid = ${g.groupid}`])))     // also fetch membership data
        .then(groupsRequests => Promise.all(groupsRequests))
        .then(groups => res.json(_.flatten(groups)));
    }
}

function getMessageGroupCollection(req, res) {
    const limit = req.query.limit || null;

    ChatMessagesGroups.find(null, limit).then(
        matches => res.json(_.map(matches, 'id'))
    );
}

function getMessageById(req, res) {
    ChatMessagesView.findById(req.params.id).then(singleMessage => {
        if(singleMessage) {
            return res.json(singleMessage);
        }

        return res.status(404).end();
    });
}

function createMessage(req, res) {

    // if(not_banned?)
    const newMessage = _.assign(req.body, {
        sender: req.token.userid,
        sent: new Date().toISOString()
    });

    return ChatMessages.create(newMessage)
    .then((newRow) => res.json(newRow))
    .catch((error) => res.json(error));

    // return res.status(403).send(MESSAGES.NOADMIN);
}

function createMessageGroup(req, res) {
    // const newMessageGroup = req.body;
    const groupRecipients = req.body.recipients;

    return ChatMessagesGroups.create({
        groupname: null
    })
    .then(newGroup => {
        const recipientRequests = groupRecipients.map(
            recipientId => {
                return ChatMessagesMembers.create({
                    groupid: newGroup.insertId,
                    userid: recipientId
                });
            }
        );

        return Promise.all(recipientRequests)
                      .then(() => newGroup);
    })
    .then(newGroup => res.json(newGroup))
    .catch(error => res.json(error));
}

function deleteMessageGroup(req, res) {
    const groupId = parseInt(req.params.gid);

    if(req.token.admin && Number.isInteger(groupId)) {
        // ChatMessages.deleteWhere([`\`group\` = ${groupId}`])
        // .then((deleted) => res.json(deleted))
        // .catch((error) => res.json(error));

        return ChatMessagesGroups.deleteId(groupId)
        .then(deleted => res.json(deleted))
        .catch(error => res.json(error));
    }

    return res.status(403).send(MESSAGES.NOADMIN);
}

module.exports = function (api) {
    // api.use('/messages/', sanitizeBody);
    api.get('/messages/groups/byUser/:uid', getMessageGroupsByUser);

    api.get('/messages/groups/', getMessageGroupCollection);
    api.post('/messages/groups/', createMessageGroup);
    api.get('/messages/groups/:gid/', getMessageGroup);
    api.delete('/messages/groups/:gid/', deleteMessageGroup);

    // api.get('/messages/', getMessageCollection);
    api.get('/messages/:id', getMessageById);
    api.post('/messages/', createMessage);
};
