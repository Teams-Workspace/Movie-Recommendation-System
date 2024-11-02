// utils/searchUtils.js
const dbConnection = require('../models/dbConnection'); // Adjust the path based on your folder structure


// Function to get movie recommendations using DFS
function getMovieRecommendationsDFS(movieId, callback) {
    const visited = new Set(); // To keep track of visited movies
    const relatedMovies = []; // Array to hold related movies

    // Define the DFS function
    function dfs(currentMovieId) {
        if (visited.has(currentMovieId)) return; // Return if already visited
        visited.add(currentMovieId); // Mark the movie as visited

        // Query to get the current movie details
        const query = "SELECT * FROM movies WHERE id = ?";
        dbConnection.query(query, [currentMovieId], (error, results) => {
            if (error) {
                console.error(error);
                return;
            }

            const movie = results[0];
            if (movie) {
                relatedMovies.push(movie); // Add the current movie to related movies
                
                // Process genres as a comma-separated string
                const relatedGenres = movie.genres ? movie.genres.split(",").map(g => g.trim()) : [];
                
                // For each genre, find related movies
                relatedGenres.forEach(relatedGenre => {
                    const genreQuery = "SELECT id FROM movies WHERE genres LIKE ?";
                    dbConnection.query(genreQuery, [`%${relatedGenre}%`], (err, genreMovies) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        genreMovies.forEach(m => dfs(m.id)); // Recursively call DFS for related movie
                    });
                });
            }
        });
    }

    dfs(movieId); // Start DFS with the initial movie ID

    // After processing all related movies, return results through the callback
    setTimeout(() => {
        callback(relatedMovies); // Return the collected related movies
    }, 100); // Timeout to allow async queries to finish (adjust based on needs)
}

module.exports = { getMovieRecommendationsDFS };
