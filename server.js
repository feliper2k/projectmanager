'use strict';

const SERVER_PORT = 8001;

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken');
const open = require('open');

const app = express();
const apiRoutes = require('./rest/apiroutes');
const apiAuth = require('./rest/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    exposedHeaders: ['x-total-count']
}));

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

// serve build
app.use(express.static('build'));

const server = app.listen(SERVER_PORT, () => {
    const devMode = process.argv.find((opt) => opt === '--dev');

    if(!devMode) {
        open(`http://localhost:${SERVER_PORT}/`);
    }
    console.log(`App listening at :${SERVER_PORT}`);
});

// chat listener
const io = require('socket.io')(server);

io.on('connection', (client) => {
    console.log('a user connected');

    debugger;

    client.on('newMessage', data => {
        client.emit('newMessage', data);
        client.broadcast.emit('newMessage', data);
    });
    client.on('newGroup', data => {
        client.emit('newGroup', data);
        client.broadcast.emit('newGroup', data);
    });

    client.on('disconnect', () => {
        console.log('user disconnected');
    });
});
