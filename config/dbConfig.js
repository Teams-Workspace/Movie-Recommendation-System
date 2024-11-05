// config/dbConfig.js
require('dotenv').config(); // Load environment variables

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'movie_recommendation_system',
};

module.exports = dbConfig;
