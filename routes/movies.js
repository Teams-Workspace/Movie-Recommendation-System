// routes/movieRoutes.js
const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/all', movieController.getAllMovies);
router.get('/search', movieController.searchMovies);
router.get('/details/:id', movieController.getMovieDetails);
router.get('/oldest', movieController.getOldestMovies);
router.get('/latest', movieController.getLatestMovies);

module.exports = router;
