'use strict';

var apiRoutes = require('express').Router();
var auth      = require('./auth');

apiRoutes.use(function authentication(req, res, next) {
    // authentication middleware
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
        // verifies secret and checks exp
        auth.verifyToken(token).then((payload) => {
            req.token = payload;
            next();
        })
        .catch((error) => {
            res.status(403).send({
                success: false,
                message: error.message
            });
        });
    }
    else {
        // if there is no token
        // return an error
        return res.status(401).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

// apiRoutes.use(function CORS...)


// endpoints
const Users = require('./users')(apiRoutes);

module.exports = apiRoutes;
