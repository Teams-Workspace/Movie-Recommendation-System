const { movieMetadata } = require('./datafetchers');

const movieGraph = new Map();

function addEdge(movie1, movie2, weight) {
    if (!movieGraph.has(movie1)) {
        movieGraph.set(movie1, { neighbors: new Map() });
    }
    if (!movieGraph.has(movie2)) {
        movieGraph.set(movie2, { neighbors: new Map() });
    }
    movieGraph.get(movie1).neighbors.set(movie2, weight);
    movieGraph.get(movie2).neighbors.set(movie1, weight);
}

function calculateSimilarity(movie1, movie2) {
    const genres1 = new Set(movieMetadata.get(movie1).genres.split(','));
    const genres2 = new Set(movieMetadata.get(movie2).genres.split(','));

    const intersection = new Set([...genres1].filter(x => genres2.has(x)));
    if (intersection.size === 0) return 0;

    const union = new Set([...genres1, ...genres2]);
    return intersection.size / union.size;
}

function buildMovieGraph() {
    const movieIds = Array.from(movieMetadata.keys());

    for (let i = 0; i < movieIds.length; i++) {
        for (let j = i + 1; j < movieIds.length; j++) { // Ensure unique pairs only
            const movie1 = movieIds[i];
            const movie2 = movieIds[j];

            const similarity = calculateSimilarity(movie1, movie2);

            if (similarity > 0.1) { // Adjust threshold as needed
                addEdge(movie1, movie2, similarity);
            }
        }
    }
    // console.log("Movie graph built successfully with genre-based similarities.");
}

module.exports = {
    buildMovieGraph,
    movieGraph
};
