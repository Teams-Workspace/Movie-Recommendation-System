const pool = require('../models/dbConnection');
const userPreferences = new Map();
const userSearchHistory = new Map();
const movieMetadata = new Map();

async function fetchUserPreferences() {
    try {
        const [rows] = await pool.query('SELECT * FROM wishlists');
        rows.forEach(row => {
            if (!userPreferences.has(row.user_id)) {
                userPreferences.set(row.user_id, new Set());
            }
            userPreferences.get(row.user_id).add(row.movie_id);
        });
    } catch (error) {
        console.error("Error fetching user preferences:", error);
    }
}

async function fetchUserSearchHistory() {
    try {
        const [rows] = await pool.query('SELECT * FROM user_search_history');
        rows.forEach(row => {
            if (!userSearchHistory.has(row.user_id)) {
                userSearchHistory.set(row.user_id, []);
            }
            userSearchHistory.get(row.user_id).push(row.search_query);
        });
    } catch (error) {
        console.error("Error fetching user search history:", error);
    }
}

async function fetchMovies() {
    try {
        const [rows] = await pool.query('SELECT * FROM movies');
        rows.forEach(row => {
            movieMetadata.set(row.id, row);
        });
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

module.exports = {
    fetchUserPreferences,
    fetchUserSearchHistory,
    fetchMovies,
    userPreferences,
    userSearchHistory,
    movieMetadata
};
