'use strict';

var mysql      = require('promise-mysql');
var config     = require('./config');

module.exports = mysql.createConnection(config.database);
