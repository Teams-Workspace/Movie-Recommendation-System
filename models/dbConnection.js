// dbConnection.js
const mysql = require('mysql2');
const dbConfig = require('../config/dbConfig'); // Adjusted path to go up one directory

const dbConnection = mysql.createConnection(dbConfig);

dbConnection.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database as id ' + dbConnection.threadId);
});

module.exports = dbConnection;
