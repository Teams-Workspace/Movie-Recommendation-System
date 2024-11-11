// routes/wishlistRouter.js
const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');

// Add a movie to the wishlist
router.post('/add/:movieId', wishlistController.addMovieToWishlist);

// Get the wishlist for a user
router.get('/', wishlistController.getWishlist);

// Delete a movie from the wishlist
router.delete('/delete/:movieId', wishlistController.deleteMovieFromWishlist);

module.exports = router;
