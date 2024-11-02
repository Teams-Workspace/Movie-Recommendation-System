// controllers/movieController.js
const movieModel = require('../models/movieModel');

// Search for movies based on the query
exports.searchMovies = (req, res) => {
    const searchTerm = req.query.q || '';
    const searchType = req.query.searchType || 'quickSort'; // Default to Quick Sort

    movieModel.searchMovies(searchTerm, searchType, (err, movies) => {
        if (err) {
            console.error('Error fetching movies:', err);
            return res.status(500).render('500', { message: 'Internal Server Error' });
        }

        res.render('searchResults', { searchTerm, movies });
    });
};

// controllers/movieController.js

exports.getMovieDetails = (req, res) => {
    const movieId = req.query.moviesdetails;
    console.log("Movie ID received:", movieId); // Log the received movie ID

    movieModel.getMovieById(movieId, (err, movie) => {
        if (err) {
            console.error('Error fetching movie details:', err);
            return res.status(500).render('500', { message: 'Internal Server Error' });
        }

        if (!movie) {
            return res.status(404).render('404', { message: 'Movie not found' });
        }

        console.log("Movie details found:", movie); // Log the fetched movie details
        res.render('movieDetails', { movie });
    });
};

