const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 100,
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    ssl  : {
        // DO NOT DO THIS
        // set up your ca correctly to trust the connection
        rejectUnauthorized: false
    }
});

/**
 * Insert into the DB
 *
 * @param tableName String
 * @param data {object} columnName: valueToInsert
 * @returns {Promise<Object>}
 */
function insert(tableName, data) {
    let columnArray = [], placeholderArray = [],
        valuesArray = [],
        query = "insert into " + tableName + " ";

    // get the column names and value
    //   also push '?' into the placeholder
    //    - '?' escapes, '??' backticks (column names)
    for (let columnName in data) {
        columnArray.push(columnName);
        valuesArray.push(data[columnName]);
        placeholderArray.push("?");
    }

    // construct column part of query
    let columnString = columnArray.join();
    query += "(" + columnString + ") ";

    // construct the value part of the query
    let placeholderString = placeholderArray.join();
    query += " values (" + placeholderString + ")";

    query = mysql.format(query, valuesArray);

    return new Promise( resolve => {
        pool.query(query, (error, results, field) => {
            if (error) console.log("There was an error", error);
            return resolve(results);
        });
    })
}

/**
 * Find a record from DB
 *
 * @param tableName String
 * @param where Object {columnName: valueItEquals}
 * @param selectFields Array [columnToReturn]
 * @returns {Promise<Object>}
 */
function findOne(tableName, where, selectFields) {
    let valuesArray = [], whereClauses = [];

    selectFields = selectFields != undefined
        ? " " + selectFields.join() + " "
        : " * ";
    let query = "select " + selectFields +
                " from " + tableName + " where ";

    for (let field in where) {
        whereClauses.push(field + " = ?");
        valuesArray.push(where[field]);
    }

    whereClauses.push("1 = true");

    query += whereClauses.join(" and ");

    query = mysql.format(query, valuesArray);
    
    return new Promise( resolve => {
        pool.query(query, (error, results, field) => {
            if (error) console.log("There was an error", error);
            return resolve(results[0] || {});
        });
    })
}

/**
 * Checks if a value already exists in the table and column
 * @param tableName string
 * @param where Object {columnName: valueItEquals}
 * @param selectFields selectFields Array [columnToReturn]
 * @returns {Promise<Boolean>}
 */
function isUnique(tableName, where, selectFields) {
    return new Promise( resolve => {
        (async () => {
            let results = await findOne(tableName, where, selectFields);

            return resolve(results.length === 0);
        })();
    })
}

module.exports = {
    insert: insert,
    findOne: findOne,
    isUnique: isUnique,
};