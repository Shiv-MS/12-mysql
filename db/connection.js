const mysql = require('mysql');
const util = require("util");
require("dotenv").config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_Password,
    database: process.env.Database
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

// This allows us to use the async/await syntax
connection.query = util.promisify(connection.query);

module.exports = connection;