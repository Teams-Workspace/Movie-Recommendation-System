// routes/movieRoutes.js
const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
// const { searchMovieTitles } = require('../controllers/movieController');


router.get('/', movieController.getRandomMovies); // Fetch random movies for home page
router.get('/all', movieController.getAllMovies);
router.get('/search', movieController.searchMovies);
router.get('/details/:id', movieController.getMovieDetails);
router.get('/oldest', movieController.getOldestMovies);
router.get('/latest', movieController.getLatestMovies);
// routes/movies.js

router.get('/search/titles', movieController.searchMovieTitles);

module.exports = router;
