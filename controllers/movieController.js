// controllers/movieController.js
const movieModel = require('../models/movieModel');


exports.searchMovies = (req, res) => {
    const searchTerm = req.query.q || '';

    movieModel.searchMovies(searchTerm, (err, movies) => {
        if (err) {
            console.error('Error fetching movies:', err);
            return res.status(500).send('Server Error');
        }

        // Assuming you want to find the first movie as the searched movie
        const searchedMovie = movies.length > 0 ? movies[0] : null;

        res.render('movies', { searchedMovie, movies }); // Pass both searchedMovie and movies array
    });
};

