'use strict';

var connection = require('./connection');

function CRUD(tableName) {
    function query(string, options) {
        return connection.then(
            (conn) => conn.query(string, options)
        );
    }

    function create(newItem) {
        return query(`INSERT INTO ${tableName} SET ?`, newItem);
    }

    function update(item) {
        return query(`UPDATE ${tableName} SET ? WHERE id=${item.id}`, item);
    }

    function deleteId(itemId) {
        return query(`DELETE FROM ${tableName} WHERE id=${itemId}`);
    }

    function findById(itemId) {
        // reduce the array before handing the items over
        return query(`SELECT * FROM ${tableName} WHERE id=${itemId}`)
        .then((matches) => matches[0]);
    }

    function find(conditions, limit) {
        const rowLimit = limit ? ` LIMIT ${limit}` : ``;

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
        find
    };
}

module.exports = CRUD;
