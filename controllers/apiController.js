const axios = require('axios');
const db = require('../models/dbConnection');

const TMDB_API_KEY = process.env.TMDB_API_KEY; // Use environment variable for TMDB API key
const TMDB_API_URL = 'https://api.themoviedb.org/3/movie/popular';

exports.fetchAndStoreMovies = async (req, res) => {
    let currentPage = 1;
    let totalPages = 1;
    let totalMoviesFetched = 0;

    try {
        do {
            const response = await axios.get(TMDB_API_URL, {
                params: {
                    api_key: TMDB_API_KEY,
                    page: currentPage
                }
            });

            const movies = response.data.results;

            if (movies.length === 0) {
                break; // Exit if no more movies are returned
            }

            const values = movies.map(movie => [
                movie.id,
                movie.title,
                movie.overview,
                movie.vote_average,
                movie.genre_ids.join(','), // Convert genre_ids to a comma-separated string
                movie.release_date,
                movie.poster_path
            ]);

            const query = `
                INSERT INTO movies (tmdb_id, title, overview, rating, genres, release_date, poster_path)
                VALUES ?
                ON DUPLICATE KEY UPDATE
                title = VALUES(title),
                overview = VALUES(overview),
                rating = VALUES(rating),
                genres = VALUES(genres),
                release_date = VALUES(release_date),
                poster_path = VALUES(poster_path)
            `;

            await db.promise().query(query, [values]);
            totalMoviesFetched += movies.length;

            totalPages = response.data.total_pages;
            currentPage++;
        } while (currentPage <= totalPages);

        res.status(200).json({
            message: `Successfully stored ${totalMoviesFetched} movies from TMDB.`,
            totalMoviesFetched
        });
    } catch (error) {
        console.error('Error fetching and storing movies:', error);
        res.status(500).json({ error: 'Failed to fetch and store movies.' });
    }
};
