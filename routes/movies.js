const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Fetch random movies for home page
router.get('/', movieController.getRandomMovies);

// Get all movies
router.get('/all', movieController.getAllMovies);

// Search for movies
router.get('/search', movieController.searchMovies);

// Get movie details by ID
router.get('/details/:id', movieController.getMovieDetails);

// Get movie details by title
router.get('/movie/:title', movieController.getMovieDetailsByTitle);

// Get a random selection of the oldest movies
router.get('/oldest', movieController.getOldestMovies);

// Get a random selection of the latest movies
router.get('/latest', movieController.getLatestMovies);

// Search movie titles for autocomplete
router.get('/search/titles', movieController.searchMovieTitles);

module.exports = router;
