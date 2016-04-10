'use strict';

const CRUD = require('./crud');
const Users = CRUD('users');
const _ = require('lodash');
const crypto = require('crypto');

function getUserCollection(req, res) {
    const limit = req.query.limit || null;

    Users.find(null, limit).then((matches) => {
        // filter out some unneeded information such as users' crypto stuff
        res.json(matches.map(
            (user) => _.omit(user, ['hash', 'salt'])
        ));
    });
}

function getUserById(req, res) {
    Users.findById(req.params.id).then((user) => {
        if(user) {
            res.json(_.omit(user, ['hash', 'salt']));
        }
        else {
            res.status(404).end();
        }
    });
}

function hashGenerator(password) {
    // create a new hash and salt for user from plaintext password
    const hash = crypto.createHash('sha256');
    const salt = crypto.randomBytes(8).toString('hex');
    hash.update(`${password}.${salt}`);
    return {
        hash: hash.digest('hex'),
        salt
    };
}

function createUser(req, res) {
    const newUser = _.assign({
        name: req.body.userName,
        displayname: req.body.displayName
    }, hashGenerator(req.body.userPass));

    return Users.create(newUser)
    .then((newRow) => res.json(newRow))
    .catch((error) => res.json(error));
}

function updateUser(req, res) {
    const resourceId = req.params.id;
    const updatesSelf = req.token.userid === parseInt(resourceId);
    let patch = {
        id: resourceId,
        displayname: req.body.displayName
    };

    if(updatesSelf || req.token.admin) {
        // we only update information supplied, hence 'patch'
        patch = _.omit(patch, _.isNil);

        // should password be changed, we need to supply a new one
        if(req.body.userPass) {
            patch = _.assign(patch, hashGenerator(req.body.userPass));
        }

        // only admins can grant or revoke admin status
        if(req.body.admin && req.token.admin) {
            patch.admin = req.body.admin;
        }

        Users.update(patch)
        .then((updated) => res.json(updated))
        .catch((error) => res.json(error));
    }
    else {
        res.status(403).send({
            success: false,
            message: 'Administrator rights needed.'
        });
    }
}

function deleteUser(req, res) {
    if(req.token.admin) {
        Users.delete(req.body.id)
        .then((updated) => res.json(updated))
        .catch((error) => res.json(error));
    }
    else {
        res.status(403).send({
            success: false,
            message: 'Administrator rights needed.'
        });
    }
}

module.exports = function (api) {
    api.get('/users/', getUserCollection);
    api.get('/users/:id', getUserById);
    api.post('/users/', createUser);
    api.put('/users/:id', updateUser);
    api.delete('/users/:id', deleteUser);
};
