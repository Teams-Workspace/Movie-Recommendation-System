import { useState, useEffect } from 'react';
import CustomLoader from './cusloader';
function ComingSoonTimeline({ apiKey }) {
  const [movies, setMovies] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUpcomingMovies() {
      try {
        setIsLoading(true);
        const API_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`;
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        // Filter movies with release dates after May 13, 2025, and limit to 5 for the timeline
        const upcomingMovies = data.results
          .filter((movie) => new Date(movie.release_date) > new Date('2025-05-13'))
          .slice(0, 5);
        setMovies(upcomingMovies);
      } catch (err) {
        console.error('Error fetching upcoming movies:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUpcomingMovies();
  }, [apiKey]);

  if (isLoading) return <CustomLoader/>; // Simple loading fallback
  if (!movies || !movies.length) return null;

  const activeMovie = movies[activeIndex];

  return (
    <div className="relative">
      {/* Background with blur effect */}
      <div className="absolute inset-0 -z-10 opacity-20 blur-xl">
        <img
          src={`https://image.tmdb.org/t/p/w1280${activeMovie.backdrop_path}`}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 bg-black/40 p-6 rounded-xl backdrop-blur-sm">
        {/* Left side - Movie details */}
        <div className="space-y-4">
          <div className="inline-block bg-red-600/20 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
            Coming Soon
          </div>

          <h3 className="text-3xl font-bold">{activeMovie.title}</h3>

          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>{activeMovie.release_date}</span>
            </div>
            <span className="text-gray-400">N/A</span> {/* Placeholder for duration */}
            <span className="text-gray-400">Action, Drama</span> {/* Placeholder for genres */}
          </div>

          <p className="text-gray-300">{activeMovie.overview}</p>

          <div className="flex space-x-3 pt-2">
            <button className="bg-red-600 hover:bg-red-600/90 text-white px-4 py-2 rounded">
              More Info
            </button>
            <button className="border-white/20 hover:bg-white/10 text-white px-4 py-2 rounded flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              Add to Watchlist
            </button>
          </div>
        </div>

        {/* Right side - Timeline */}
        <div className="flex flex-col justify-center">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700"></div>

            {/* Timeline items */}
            <div className="space-y-6">
              {movies.map((movie, index) => (
                <div
                  key={movie.id}
                  className={`relative pl-12 cursor-pointer transition-all duration-300 ${
                    index === activeIndex ? 'scale-105' : 'opacity-70 hover:opacity-100'
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-0 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full flex items-center justify-center border-2 ${
                      index === activeIndex
                        ? 'border-red-600 bg-red-600 text-white'
                        : 'border-gray-600 bg-gray-800'
                    }`}
                  >
                    {index + 1}
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="relative h-20 w-14 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={movie.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <h4 className="font-medium">{movie.title}</h4>
                      <p className="text-sm text-gray-400">{movie.release_date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComingSoonTimeline;