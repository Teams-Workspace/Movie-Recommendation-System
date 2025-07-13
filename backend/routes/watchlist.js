const express = require('express');
const router = express.Router();
const { verifyToken } = require('../config/JWTconfig');
const { getWatchlist, addToWatchlist, removeFromWatchlist } = require('../controllers/watchlistController');

router.get('/', verifyToken, getWatchlist);

// @route POST /api/likes
router.post('/', verifyToken, addToWatchlist);

// @route PUT /api/likes
router.put('/', verifyToken, removeFromWatchlist);

module.exports = router;
