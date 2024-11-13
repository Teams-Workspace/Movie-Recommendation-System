const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Route for fetching movies
router.get('/', movieController.getMovies);
router.get('/all', movieController.getAllMovies);
router.get('/search', movieController.searchMovies);
router.get('/details/:id', movieController.getMovieDetails);
router.get('/oldest', movieController.getOldestMovies);
router.get('/latest', movieController.getLatestMovies);
router.get('/search/titles', movieController.searchMovieTitles);

module.exports = router;
