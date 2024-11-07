// routes/movieRoutes.js
const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Route to get all movies
router.get('/all', movieController.getAllMovies);

// Route to search for movies
router.get('/search', movieController.searchMovies);

// Route to get movie details
router.get('/:id', movieController.getMovieDetails);

// Route to get a random selection of the oldest movies
router.get('/oldest', movieController.getOldestMovies);

// Route to get a random selection of the latest movies
router.get('/latest', movieController.getLatestMovies);



module.exports = router;
