const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

// Route to fetch and store movies
router.post('/movies', apiController.fetchAndStoreMovies);

module.exports = router;
