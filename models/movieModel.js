const initializeConnection = require('./dbConnection');
const { quickSort, compareByRating, compareByReleaseDate, getRandomMovies } = require('../utils/sortUtils');

/**
 * Fetches all movies from the database.
 */
exports.getAllMovies = async () => {
    const connection = await initializeConnection();
    const query = "SELECT * FROM movies";
    try {
        const [results] = await connection.query(query);
        return results;
    } catch (err) {
        // console.error('Error fetching all movies:', err);
        throw err;
    } finally {
        await connection.end();
    }
};

/**
 * Searches for movies by a term, applying a specified sorting method.
 */
exports.searchMovies = async (searchTerm, searchType = 'quickSort') => {
    const connection = await initializeConnection();
    const query = "SELECT * FROM movies WHERE title LIKE ? OR overview LIKE ?";
    const pattern = `%${searchTerm}%`;
    try {
        const [results] = await connection.query(query, [pattern, pattern]);
        // Apply sorting based on searchType
        let sortedMovies = results;
        if (searchType === 'quickSort') {
            sortedMovies = quickSort(results, compareByRating); // Sort by rating
        }
        return sortedMovies;
    } catch (err) {
        // console.error('Error executing search query:', err);
        throw err;
    } finally {
        await connection.end();
    }
};

/**
 * Retrieves movie details by its unique ID.
 */
exports.getMovieById = async (movieId) => {
    const connection = await initializeConnection();
    const query = "SELECT * FROM movies WHERE id = ?";
    try {
        const [results] = await connection.query(query, [movieId]);
        const movie = results[0];
        return movie;
    } catch (err) {
        // console.error('Error fetching movie details:', err);
        throw err;
    } finally {
        await connection.end();
    }
};

/**
 * Fetches and sorts the oldest movies by release date.
 */
exports.getOldestMovies = async (limit = 50) => {
    const connection = await initializeConnection();
    const query = "SELECT * FROM movies";
    try {
        const [results] = await connection.query(query);
        const sortedOldestMovies = quickSort(results, compareByReleaseDate);
        const oldestMovies = getRandomMovies(sortedOldestMovies, limit);
        return oldestMovies;
    } catch (err) {
        // console.error('Error fetching movies for oldest selection:', err);
        throw err;
    } finally {
        await connection.end();
    }
};

/**
 * Fetches and sorts the latest movies by release date.
 */
exports.getLatestMovies = async (limit = 50) => {
    const connection = await initializeConnection();
    const query = "SELECT * FROM movies";
    try {
        const [results] = await connection.query(query);
        // Sort by release date and reverse for latest movies
        const sortedLatestMovies = quickSort(results, compareByReleaseDate).reverse();
        const latestMovies = getRandomMovies(sortedLatestMovies, limit);
        return latestMovies;
    } catch (err) {
        // console.error('Error fetching movies for latest selection:', err);
        throw err;
    } finally {
        await connection.end();
    }
};
