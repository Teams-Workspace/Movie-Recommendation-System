import { useState, useEffect } from 'react';

function HeroGrid({ apiKey }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=2`;
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setMovies(data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [apiKey]);

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-red-500 text-center">Error fetching movies: {error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500 text-center">Loading movies...</p>
      </div>
    );
  }

  if (!movies || movies.length < 5) return null;

  const mainFeature = movies[0];
  const gridMovies = movies.slice(1, 5);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-screen w-full">
      {/* Main Feature - Takes up 2 columns */}
      <div
        className="relative md:col-span-2 rounded-xl overflow-hidden group h-[300px] md:h-full"
        onMouseEnter={() => setHoveredIndex(0)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <img
          src={`https://image.tmdb.org/t/p/w1920${mainFeature.backdrop_path}`}
          alt={mainFeature.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />

        <div className="absolute bottom-0 left-0 p-6 w-full">
          <div className="flex items-center space-x-2 mb-2">
            <span className="bg-primary px-2 py-0.5 text-xs font-semibold rounded">FEATURED</span>
            <div className="flex items-center text-yellow-400">
              <span className="text-sm">{mainFeature.vote_average.toFixed(1)}</span>
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-2">{mainFeature.title}</h3>
          <p className="text-sm text-gray-300 mb-4 line-clamp-2 md:line-clamp-3">{mainFeature.overview}</p>
          <div className="flex space-x-3">
            <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg">
              Like
            </button>
            <button className="border-white/20 hover:bg-white/10 text-white px-4 py-2 rounded-lg border">
              More Info
            </button>
            <button className="border-white/20 hover:bg-white/10 text-white px-4 py-2 rounded-lg border">
              Watchlist
            </button>
          </div>
        </div>

        <div
          className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
            hoveredIndex === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <button className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90 text-white flex items-center justify-center">
            Like
          </button>
        </div>
      </div>

      {/* Grid of 4 movies - Takes up 1 column, stacked */}
      <div className="grid grid-cols-2 md:grid-cols-1 gap-4 h-[300px] md:h-full">
        {gridMovies.map((movie, index) => (
          <div
            key={movie.id}
            className="relative rounded-xl overflow-hidden group"
            onMouseEnter={() => setHoveredIndex(index + 1)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />

            <div className="absolute bottom-0 left-0 p-3 w-full">
              <div className="flex items-center space-x-2 mb-1">
                <div className="flex items-center text-yellow-400">
                  <span className="text-xs">{movie.vote_average.toFixed(1)}</span>
                </div>
              </div>
              <h3 className="text-sm font-bold">{movie.title}</h3>
            </div>

            <div
              className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
                hoveredIndex === index + 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <button className="rounded-full w-10 h-10 bg-primary hover:bg-primary/90 text-white flex items-center justify-center">
                Like
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeroGrid;