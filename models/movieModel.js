// models/movieModel.js
const dbConnection = require('./dbConnection');

// // Search movies by title, genres, or rating
// exports.searchMovies = (searchTerm, callback) => {
//     const query = `
//         SELECT * FROM movies 
//         WHERE title LIKE ? OR genres LIKE ? OR rating LIKE ?`;
//     dbConnection.query(query, [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`], (err, results) => {
//         callback(err, results);
//     });
// };

// // Optional: If you want to add methods for finding movies by title or genre
// exports.findMovieByTitle = (title, callback) => {
//     const query = `SELECT * FROM movies WHERE title = ?`;
//     dbConnection.query(query, [title], (err, result) => {
//         callback(err, result[0]); // Returning single movie
//     });
// };

// exports.findSuggestionsByGenre = (genres, callback) => {
//     const query = `SELECT * FROM movies WHERE genres IN (?) LIMIT 4`;
//     dbConnection.query(query, [genres.split(', ')], callback); // Splits genres string into an array
// };
// models/movieModel.js
const { quickSort, dfsSearch, bfsSearch } = require('../utils/searchUtils');

// // Search for movies based on the search term and type
// exports.searchMovies = (searchTerm, searchType, callback) => {
//     const query = `SELECT * FROM movies WHERE title LIKE ? OR genres LIKE ?`;
//     const searchPattern = `%${searchTerm}%`;

//     dbConnection.query(query, [searchPattern, searchPattern], (err, results) => {
//         if (err) return callback(err);

//         let sortedResults;
//         switch (searchType) {
//             case 'quickSort':
//                 // Sort by rating in descending order
//                 sortedResults = quickSort(results, (a, b) => b.rating - a.rating);
//                 break;
//             case 'dfs':
//                 // Assuming the searchTerm is a genre
//                 sortedResults = dfsSearch(results, searchTerm);
//                 break;
//             case 'bfs':
//                 // Assuming the searchTerm is a keyword in the title
//                 sortedResults = bfsSearch(results, searchTerm);
//                 break;
//             default:
//                 sortedResults = results; // No sorting applied
//         }

//         callback(null, sortedResults);
//     });
// };

// // Get a movie by its ID
// exports.getMovieById = (movieId, callback) => {
//     const query = `SELECT * FROM movies WHERE id = ?`;
//     dbConnection.query(query, [movieId], (err, results) => {
//         if (err) return callback(err);
//         callback(null, results[0]); // Return the first (and only) result
//     });
// };
