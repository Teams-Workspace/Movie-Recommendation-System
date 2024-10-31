// routes/movieRoutes.js
const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Route to search for movies
router.get('/search', movieController.searchMovies);

// You can add more routes if needed, such as fetching all movies
router.get('/all', (req, res) => {
    movieController.getAllMovies(req, res);
});

module.exports = router;
