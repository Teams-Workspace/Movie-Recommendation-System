const API_KEY = 'api_key';
const BASE_URL = 'https://api.themoviedb.org/3';
const POSTER_PATH = 'https://image.tmdb.org/t/p/w200';
let page = 1;
let isFetching = false; // To prevent multiple fetch requests

// Get movie container element
const movieContainer = document.getElementById('movie-container');

// Function to fetch movies
async function fetchMovies(page) {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
    const data = await response.json();
    displayMovies(data.results);
  } catch (error) {
    console.error('Error fetching movies:', error);
  } finally {
    isFetching = false; // Allow new requests after the current one is done
  }
}

// Function to display movies
function displayMovies(movies) {
  movies.forEach(movie => {
    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie');
    movieDiv.innerHTML = `
      <img src="${POSTER_PATH + movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
    `;
    movieContainer.appendChild(movieDiv);
  });
}

// Infinite Scroll with delay
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isFetching) {
    isFetching = true; // Prevent multiple triggers
    setTimeout(() => { // Introduce delay before fetching more movies
      page++;
      fetchMovies(page);
    }, 1500); // Adjust this delay as per the desired slowness (1.5 seconds here)
  }
});

// Initial fetch
fetchMovies(page);
