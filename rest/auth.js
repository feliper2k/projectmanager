'use strict';

const TOKEN_LIFETIME = '3h';
const secret = '032564cb521ded5193ae5d02f435088c';  // we would, of course, keep it somewhere safer in the production

const crypto = require('crypto');
const CRUD = require('./crud');
const mysql = require('promise-mysql');
const jwt = require('jsonwebtoken');

function getToken(inputData) {
    const hash = crypto.createHash('sha256');
    const userName = mysql.escape(inputData.userName);

    return CRUD('users').find([`name=${userName}`])
    .then((matchingUsers) => {
        // since find() resolves as an array, we flatten it to a single value
        if(matchingUsers.length) {
            const user = matchingUsers[0];

            hash.update(`${inputData.userPass}.${user.salt}`);
            const verificationHash = hash.digest('hex');
            const correctLogin = verificationHash === user.hash;

            if(correctLogin) {
                const payload = {
                    name: user.displayname,
                    userid: user.id,
                    admin: user.admin
                };

                const token = jwt.sign(payload, secret, {
                    expiresIn: TOKEN_LIFETIME
                });

                return Promise.resolve(token);
            }
        }

        return Promise.reject({
            status: 403,
            message: 'Invalid username and/or password'
        });
    });
}

function verifyToken(token) {
    return new Promise((resolve, reject) =>
    jwt.verify(token, secret, function(err, decoded) {
        if (err) {
            return reject(err);
        } else {
            return resolve(decoded);
        }
    }));
}

const Auth = {
    getToken,
    verifyToken
}

module.exports = Auth;
