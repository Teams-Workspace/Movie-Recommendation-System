const wishlistModel = require('../models/wishlistModel');

// Add a movie to the wishlist
exports.addMovieToWishlist = async (req, res) => {
    const userId = req.user.id; 
    const movieId = req.params.movieId;

    try {
        await wishlistModel.addMovie(userId, movieId);
        res.json({ message: 'Movie added to wishlist successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Get the wishlist for a user
exports.getWishlist = async (req, res) => {
    if (!req.user) {
        return res.redirect('/auth/signup'); // Redirect if user is not authenticated
    }

    const userId = req.user.id;

    try {
        const wishlist = await wishlistModel.getWishlistByUserId(userId);
        res.render('wishlist', { wishlist });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Delete a movie from the wishlist
exports.deleteMovieFromWishlist = async (req, res) => {
    const userId = req.user.id;
    const movieId = req.params.movieId;

    try {
        await wishlistModel.deleteMovie(userId, movieId);
        res.json({ success: true, message: 'Movie removed from wishlist successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



