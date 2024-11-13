const datafetchers = require('./datafetchers');
const { buildMovieGraph } = require('./movieGraph');

async function initializeData() {
    try {
        // Fetch data in parallel for efficiency
        await Promise.all([
            datafetchers.fetchUserPreferences(),
            datafetchers.fetchUserSearchHistory(),
            datafetchers.fetchMovies()
        ]);

        // console.log("Data fetching completed successfully.");

        // Build the movie graph if not already built
        if (!global.movieGraphBuilt) {
            buildMovieGraph();
            global.movieGraphBuilt = true; // Avoid redundant builds
            // console.log("Movie graph built successfully.");
        }
        
    } catch (error) {
        console.error("Error initializing data:", error);
    }
}

module.exports = {
    initializeData
};
