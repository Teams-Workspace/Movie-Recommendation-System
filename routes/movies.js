const express = require('express');
const router = express.Router();
const dbConnection = require('../models/dbConnection');
const { getMovieRecommendationsDFS } = require('../utils/searchUtils');
const { quickSort, compareByRating, compareByReleaseDate, getRandomMovies } = require('../utils/sortUtils'); // Import sort utilitie

// Function to get all movies from the database
function getAllMovies(callback) {
    const query = "SELECT * FROM movies"; // Fetch all movies
    dbConnection.query(query, (error, results) => {
        if (error) {
            console.error(error);
            return callback(error);
        }
        callback(null, results);
    });
}

// Search for movies based on a query
router.get('/search', (req, res) => {
    const searchTerm = req.query.q;

    // Query to search for movies
    const query = "SELECT * FROM movies WHERE title LIKE ? OR overview LIKE ?";
    dbConnection.query(query, [`%${searchTerm}%`, `%${searchTerm}%`], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Internal server error');
        }

        // Sort the results using Quick Sort by rating
        const sortedMovies = quickSort(results, compareByRating);

        res.render('searchResults', { movies: sortedMovies, searchTerm });
    });
});

// Get movie details and related recommendations
router.get('/details/:id', (req, res) => {
    const movieId = req.params.id;

    // Query to get the movie details
    const query = "SELECT * FROM movies WHERE id = ?";
    dbConnection.query(query, [movieId], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Internal server error');
        }

        const movie = results[0];
        if (!movie) {
            return res.status(404).send('Movie not found');
        }

        // Get recommendations based on the selected movie
        getMovieRecommendationsDFS(movieId, (relatedMovies) => {
            // Sort related movies using Quick Sort by rating
            const sortedRelatedMovies = quickSort(relatedMovies, compareByRating);
            res.render('movieDetails', { movie, relatedMovies: sortedRelatedMovies });
        });
    });
});

// Get a random selection of the oldest movies
router.get('/oldest', (req, res) => {
    const query = "SELECT * FROM movies"; // Fetch all movies
    dbConnection.query(query, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Internal server error');
        }

        // Sort the results by release date using Quick Sort and get the oldest movies
        const sortedOldestMovies = quickSort(results, compareByReleaseDate);
        const randomOldestMovies = getRandomMovies(sortedOldestMovies, 50);
        res.render('searchResults', { movies: randomOldestMovies, searchTerm: 'Random Oldest Movies' });
    });
});

// Get a random selection of the latest movies
router.get('/latest', (req, res) => {
    const query = "SELECT * FROM movies"; // Fetch all movies
    dbConnection.query(query, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Internal server error');
        }

        // Sort the results by release date using Quick Sort and reverse to get the latest at the top
        const sortedLatestMovies = quickSort(results, compareByReleaseDate).reverse();
        const randomLatestMovies = getRandomMovies(sortedLatestMovies, 50);
        res.render('searchResults', { movies: randomLatestMovies, searchTerm: 'Random Latest Movies' });
    });
});

module.exports = router;
