// utils/sortUtils.js

// Quick Sort implementation
function quickSort(array, compareFunction) {
    if (array.length <= 1) return array;
    
    const pivot = array[array.length - 1]; // Choosing the last element as the pivot
    const left = [];
    const right = [];

    for (let i = 0; i < array.length - 1; i++) {
        if (compareFunction(array[i], pivot) < 0) {
            left.push(array[i]);
        } else {
            right.push(array[i]);
        }
    }

    return [...quickSort(left, compareFunction), pivot, ...quickSort(right, compareFunction)];
}

// Example comparison function for sorting by rating
function compareByRating(movieA, movieB) {
    return movieB.rating - movieA.rating; // Descending order
}

function compareByReleaseDate(movieA, movieB) {
    return new Date(movieA.release_date) - new Date(movieB.release_date); // Ascending order
}

// Utility function to get a random subset of movies
function getRandomMovies(movies, limit) {
    const shuffledMovies = movies.sort(() => 0.5 - Math.random()); // Shuffle the movies array
    return shuffledMovies.slice(0, Math.min(limit, shuffledMovies.length)); // Limit to specified number
}


module.exports = { quickSort, compareByRating, compareByReleaseDate, getRandomMovies };
