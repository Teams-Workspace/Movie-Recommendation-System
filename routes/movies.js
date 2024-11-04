// routes/movieRoutes.js
const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
// const { searchMovieTitles } = require('../controllers/movieController');

router.get('/all', movieController.getAllMovies);
router.get('/search', movieController.searchMovies);
router.get('/details/:id', movieController.getMovieDetails);
router.get('/oldest', movieController.getOldestMovies);
router.get('/latest', movieController.getLatestMovies);
// routes/movies.js

// router.get('/search/titles', async (req, res) => {
//     const searchTerm = req.query.q;
//     try {
//         const titles = await searchMovieTitles(searchTerm);
//         res.json(titles);
//     } catch (err) {
//         console.error('Error fetching movie titles:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

module.exports = router;
