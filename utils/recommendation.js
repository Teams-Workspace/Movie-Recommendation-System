const { userPreferences, userSearchHistory, movieMetadata } = require('./datafetchers');
const { movieGraph } = require('./movieGraph');

function recommendMovies(userId) {
    const preferences = userPreferences.get(userId) || new Set();
    const searchHistory = userSearchHistory.get(userId) || [];
    const recommendedMovies = new Map();

    // Recommendations based on user's wishlist
    preferences.forEach(movieId => {
        const movie = movieGraph.get(movieId);
        if (movie) {
            movie.neighbors.forEach((weight, neighborId) => {
                if (!preferences.has(neighborId)) {
                    recommendedMovies.set(neighborId, (recommendedMovies.get(neighborId) || 0) + weight);
                }
            });
        }
    });

    // Recommendations based on user's search history
    searchHistory.forEach(searchTerm => {
        movieMetadata.forEach((movie, movieId) => {
            if (movie.title.includes(searchTerm)) {
                recommendedMovies.set(movieId, (recommendedMovies.get(movieId) || 0) + 1);
            }
        });
    });

    return Array.from(recommendedMovies.entries())
        .sort((a, b) => b[1] - a[1])
        .map(([movieId]) => movieMetadata.get(movieId))
        .filter(Boolean); // Filter out any undefined movies
}

function recommendGeneralMovies() {
    const generalRecommendations = [];

    movieMetadata.forEach(movie => {
        // Add logic to determine general recommendations
        generalRecommendations.push(movie);
    });

    // Sort or shuffle the general recommendations as needed
    return generalRecommendations.slice(0, 10); // Return the top 10 recommendations
}

module.exports = {
    recommendMovies,
    recommendGeneralMovies
};
