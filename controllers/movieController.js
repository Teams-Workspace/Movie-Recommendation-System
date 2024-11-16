const path = require('path');
const movies = require(path.join(__dirname, '..', 'public', 'js', 'movies'));
const movieModel = require('../models/movieModel');
const pool = require('../models/dbConnection');
const { saveUserSearch } = require('../models/searchHistory');
const { initializeData } = require('../utils/initializeData');
const { recommendMovies, recommendGeneralMovies } = require('../utils/recommendation');


// Get all movies
exports.getAllMovies = async (req, res) => {
    try {
        const movies = await movieModel.getAllMovies();
        // res.render('allMovies', { movies });
    } catch (err) {
        console.error('Error fetching all movies:', err);
        res.status(500).render('500');
    }
};

// Search for movies
exports.searchMovies = async (req, res) => {
    const searchTerm = req.query.q || '';
    const searchType = req.query.searchType || 'quickSort';
    const userId = req.user ? req.user.id : null;

    if (userId) {
        try {
            await saveUserSearch(userId, searchTerm);
        } catch (error) {
            console.error('Error saving search query:', error);
        }
    }

    try {
        const movies = await movieModel.searchMovies(searchTerm, searchType);
        res.render('searchResults', { searchTerm, movies });
    } catch (err) {
        console.error('Error fetching movies:', err);
        res.status(500).render('500');
    }
};

// Get movie details by title
exports.getMovieDetailsByTitle = async (req, res) => {
    const movieTitle = decodeURIComponent(req.params.title);

    try {
        const movie = movies.find(m => m.title === movieTitle);

        if (movie) {
            res.render('movie_details', { movie });
        } else {
            res.status(404).render('404');
        }
    } catch (err) {
        console.error('Error fetching movie details by title:', err);
        res.status(500).render('500');
    }
};

// Get movie details by ID
exports.getMovieDetails = async (req, res) => {
    const movieId = req.params.id;

    try {
        const movie = await movieModel.getMovieById(movieId);
        if (!movie) {
            return res.status(404).render('404', { message: 'Movie not found' });
        }
        res.render('movieDetails', { movie });
    } catch (err) {
        console.error('Error fetching movie details:', err);
        res.status(500).render('500');
    }
};

// Get a random selection of the oldest movies
exports.getOldestMovies = async (req, res) => {
    try {
        const movies = await movieModel.getOldestMovies(50);
        res.render('searchResults', { movies, searchTerm: 'Random Oldest Movies' });
    } catch (err) {
        console.error('Error fetching oldest movies:', err);
        res.status(500).render('500');
    }
};

// Get a random selection of the latest movies
exports.getLatestMovies = async (req, res) => {
    try {
        const movies = await movieModel.getLatestMovies(50);
        res.render('searchResults', { movies, searchTerm: 'Random Latest Movies' });
    } catch (err) {
        console.error('Error fetching latest movies:', err);
        res.status(500).render('500');
    }
};

// Search movie titles for autocomplete
exports.searchMovieTitles = async (req, res) => {
    const searchTerm = req.query.q || '';

    let connection;
    try {
        connection = await pool.getConnection();
        const query = "SELECT title FROM movies WHERE title LIKE ? LIMIT 10";
        const pattern = `%${searchTerm}%`;
        const [results] = await connection.query(query, [pattern]);
        const titles = results.map(movie => movie.title);
        res.json(titles);
    } catch (err) {
        console.error('Error fetching movie titles:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        if (connection) connection.release();
    }
};

// const { recommendMovies, recommendGeneralMovies } = require('../utils/recommendation');

exports.getRandomMovies = async (req, res) => {
    try {
        const movies = await movieModel.getRandomMovies(50);
        let recommendations = [];

        // Check if the user is logged in and has an id
        if (req.user && req.user.id) {
            recommendations = recommendMovies(req.user.id).slice(0, 14); // Get recommendations for the user
        } else {
            recommendations = recommendGeneralMovies().slice(0, 14); // Get general recommendations
        }

        res.render('index', { movies, recommendations, searchTerm: 'Random Movies' });
    } catch (err) {
        console.error('Error fetching random movies:', err);
        res.status(500).render('500');
    }
};
exports.getMovies = async (req, res) => {
    try {
        // Initialize data
        await initializeData();

        let recommendations = [];
        let movies = [];
        const searchTerm = req.query.q || '';

        // Check if the user is logged in and has an id
        if (req.user && req.user.id) {
            recommendations = recommendMovies(req.user.id).slice(0, 14); // Limit recommendations to 14
        } else {
            recommendations = recommendGeneralMovies().slice(0, 14); // Limit general recommendations to 14
        }

        // Fetch 30 random movies
        movies = await movieModel.getRandomMovies(30);

        // Render the index page with recommendations, movies, and searchTerm
        res.render('index', { recommendations, movies, searchTerm });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send(error.message);
    }
};
