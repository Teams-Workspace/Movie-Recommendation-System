const pool = require('./dbConnection');  // Ensure this path is correct

async function saveUserSearch(userId, searchQuery) {
    const connection = await pool.getConnection();
    try {
        // Save the search query in the database
        await connection.query(
            'INSERT INTO user_search_history (user_id, search_query) VALUES (?, ?)',
            [userId, searchQuery]
        );
    } catch (error) {
        console.error('Error saving user search history:', error);
        throw error;
    } finally {
        connection.release();
    }
}

module.exports = {
    saveUserSearch
};
