'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const apiRoutes = require('./rest/apiroutes');
const apiAuth = require('./rest/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// authentication token endpoint
app.post('/auth', function (req, res) {
    apiAuth.getToken(req.body)
    .then((token) => {
        res.json({
            success: true,
            token
        }).end();
    })
    .catch((error) => {
        res.status(error.status).json({
            success: false,
            message: error.message
        }).end();
    });
});

// REST endpoints
app.use('/api', apiRoutes);

app.listen(8001);

console.log('App listening at :8001');
