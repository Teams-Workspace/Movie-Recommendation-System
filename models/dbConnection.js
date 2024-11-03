// dbConnection.js
const mysql = require('mysql2/promise');
const dbConfig = require('../config/dbConfig');

async function initializeConnection() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log('Connected to database as id ' + connection.threadId);
        return connection;
    } catch (err) {
        console.error('Database connection failed: ' + err.stack);
    }
}

module.exports = initializeConnection;
