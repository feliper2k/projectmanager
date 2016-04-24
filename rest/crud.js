'use strict';

var connection = require('./connection');
var mysql = require('promise-mysql');

function CRUD(tableName) {
    tableName = `\`${tableName}\``;     // mysql backtick escaping

    function query(string, options) {
        return connection.then(
            (conn) => conn.query(string, options)
        );
    }

    function totalCount() {
        // return query(`SELECT COUNT(*) FROM ${tableName} AS count`).then(result => result.count);
        return query(`SELECT COUNT(*) as count FROM ${tableName}`)
               .then(result => result[0].count);
    }

    function create(newItem) {
        return query(`INSERT INTO ${tableName} SET ?`, newItem);
    }

    function update(item) {
        item.id = parseInt(item.id);
        return query(`UPDATE ${tableName} SET ? WHERE id=${item.id}`, item);
    }

    function deleteId(itemId) {
        itemId = parseInt(itemId);
        return query(`DELETE FROM ${tableName} WHERE id=${itemId}`);
    }

    function findById(itemId) {
        // reduce the array before handing the items over
        itemId = parseInt(itemId);
        return query(`SELECT * FROM ${tableName} WHERE id=${itemId}`)
        .then((matches) => matches[0]);
    }

    function find(conditions, limit) {
        const limitFormat = /^\d+(,\d+)?$/;
        const rowLimit = limitFormat.test(limit) ? ` LIMIT ${limit}` : ``;

        if(conditions) {
            let constraint = conditions.join(' AND ');
            return query(`SELECT * FROM ${tableName} WHERE ${constraint}${rowLimit}`);
        }

        return query(`SELECT * FROM ${tableName}${rowLimit}`);
    }

    return {
        create,
        update,
        deleteId,
        findById,
        find,
        totalCount
    };
}

module.exports = CRUD;
