// controllers/movieController.js
const movieModel = require('../models/movieModel');
const initializeConnection = require('../models/dbConnection');

// Get all movies
exports.getAllMovies = async (req, res) => {
    try {
        const movies = await movieModel.getAllMovies();
        // res.render('allMovies', { movies });
    } catch (err) {
        // console.error('Error fetching all movies:', err);
        res.status(500).render('500');
        // res.status(500).render('500', { message: 'Internal Server Error' });
    }
};

// Search for movies
exports.searchMovies = async (req, res) => {
    const searchTerm = req.query.q || '';
    const searchType = req.query.searchType || 'quickSort'; 

    try {
        const movies = await movieModel.searchMovies(searchTerm, searchType);
        res.render('searchResults', { searchTerm, movies });
    } catch (err) {
        // console.error('Error fetching movies:', err);
        res.status(500).render('500');
        // res.status(500).render('500', { message: 'Internal Server Error' });
    }
};

// Get movie details
exports.getMovieDetails = async (req, res) => {
    const movieId = req.params.id;

    try {
        const movie = await movieModel.getMovieById(movieId);
        if (!movie) {
            return res.status(404).render('404', { message: 'Movie not found' });
        }
        res.render('movieDetails', { movie });
    } catch (err) {
        // console.error('Error fetching movie details:', err);
        res.status(500).render('500');
        // res.status(500).render('500', { message: 'Internal Server Error' });
    }
};

// Get a random selection of the oldest movies
exports.getOldestMovies = async (req, res) => {
    try {
        const movies = await movieModel.getOldestMovies(50);
        res.render('searchResults', { movies, searchTerm: 'Random Oldest Movies' });
    } catch (err) {
        // console.error('Error fetching oldest movies:', err);
        res.status(500).render('500');
        // res.status(500).render('500', { message: 'Internal Server Error' });
    }
};

// Get a random selection of the latest movies
exports.getLatestMovies = async (req, res) => {
    try {
        const movies = await movieModel.getLatestMovies(50);
        res.render('searchResults', { movies, searchTerm: 'Random Latest Movies' });
    } catch (err) {
        // console.error('Error fetching latest movies:', err);
        res.status(500).render('500');
        // res.status(500).render('500', { message: 'Internal Server Error' });
    }
};


// // controllers/movieController.js
// exports.searchMovieTitles = async (searchTerm) => {
//     const connection = await initializeConnection();
//     const query = "SELECT title FROM movies WHERE title LIKE ? LIMIT 10"; // LIMIT ensures no more than 10 results
//     const pattern = `%${searchTerm}%`;
    
//     try {
//         const [results] = await connection.query(query, [pattern]);
//         return results.map(movie => movie.title); // This will return all titles found, up to 10
//     } catch (err) {
//         console.error('Error fetching movie titles:', err);
//         throw err;
//     } finally {
//         await connection.end();
//     }
// };


