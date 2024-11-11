const pool = require('./dbConnection');

// Add a movie to the wishlist
exports.addMovie = async (userId, movieId) => {
    const query = `
        INSERT INTO wishlists (user_id, movie_id, added_at)
        VALUES (?, ?, NOW())
        ON DUPLICATE KEY UPDATE added_at = NOW()`;

    await pool.query(query, [userId, movieId]);
};

// Get the wishlist for a user
exports.getWishlistByUserId = async (userId) => {
    const query = `
        SELECT movies.id, movies.title, movies.poster_path 
        FROM wishlists
        JOIN movies ON wishlists.movie_id = movies.id
        WHERE wishlists.user_id = ?`;

    const [results] = await pool.query(query, [userId]);
    return results;
};

// Delete a movie from the wishlist
exports.deleteMovie = async (userId, movieId) => {
    const query = 'DELETE FROM wishlists WHERE user_id = ? AND movie_id = ?';
    await pool.query(query, [userId, movieId]);
};
