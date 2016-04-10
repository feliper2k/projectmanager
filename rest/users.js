'use strict';

const CRUD = require('./crud');
const Users = CRUD('users');
const _ = require('lodash');

module.exports = function (api) {
    api.get('/users/', function (req, res) {
        const limit = req.query.limit ? parseInt(req.query.limit) : null;

        Users.find(null, limit).then((matches) => {
            // filter out some unneeded information such as users' crypto stuff
            res.json(matches.map(
                (user) => _.omit(user, ['hash', 'salt'])
            ));
        });
    });

    api.get('/users/:id', function (req, res) {
        Users.findById(req.params.id).then((user) => {
            // filter out some unneeded information such as users' crypto stuff
            if(user) {
                res.json(_.omit(user, ['hash', 'salt']));
            }
            else {
                res.status(404).end();
            }
        });
    });

    api.post('/users/', function (req, res) {
        // admin-only functionality
        if(req.token.admin) {
            
        }
    });
}
