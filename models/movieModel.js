// models/movieModel.js
const dbConnection = require('./dbConnection');

// Search movies by title, genres, or rating
exports.searchMovies = (searchTerm, callback) => {
    const query = `
        SELECT * FROM movies 
        WHERE title LIKE ? OR genres LIKE ? OR rating LIKE ?`;
    dbConnection.query(query, [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`], (err, results) => {
        callback(err, results);
    });
};

// Optional: If you want to add methods for finding movies by title or genre
exports.findMovieByTitle = (title, callback) => {
    const query = `SELECT * FROM movies WHERE title = ?`;
    dbConnection.query(query, [title], (err, result) => {
        callback(err, result[0]); // Returning single movie
    });
};

exports.findSuggestionsByGenre = (genres, callback) => {
    const query = `SELECT * FROM movies WHERE genres IN (?) LIMIT 4`;
    dbConnection.query(query, [genres.split(', ')], callback); // Splits genres string into an array
};
