import { useState, useEffect } from 'react';

function MasonryLayout({ apiKey }) {
  const [movies, setMovies] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=5`;
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setMovies(data.results || []);
      } catch (err) {
        console.error('Error fetching movies:', err);
      }
    }

    fetchMovies();
  }, [apiKey]);

  if (!movies || movies.length < 9) return null;

  // Create columns for masonry layout
  const leftColumn = movies.slice(0, 3);
  const middleColumn = movies.slice(3, 6);
  const rightColumn = movies.slice(6, 9);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Left Column */}
      <div className="space-y-4">
        {leftColumn.map((movie, index) => (
          <MasonryItem
            key={movie.id}
            movie={movie}
            isHovered={hoveredIndex === index}
            onHover={() => setHoveredIndex(index)}
            onLeave={() => setHoveredIndex(null)}
            height={index === 0 ? 'h-[300px]' : 'h-[200px]'}
          />
        ))}
      </div>

      {/* Middle Column */}
      <div className="space-y-4">
        {middleColumn.map((movie, index) => (
          <MasonryItem
            key={movie.id}
            movie={movie}
            isHovered={hoveredIndex === index + 3}
            onHover={() => setHoveredIndex(index + 3)}
            onLeave={() => setHoveredIndex(null)}
            height={index === 1 ? 'h-[300px]' : 'h-[200px]'}
          />
        ))}
      </div>

      {/* Right Column */}
      <div className="space-y-4">
        {rightColumn.map((movie, index) => (
          <MasonryItem
            key={movie.id}
            movie={movie}
            isHovered={hoveredIndex === index + 6}
            onHover={() => setHoveredIndex(index + 6)}
            onLeave={() => setHoveredIndex(null)}
            height={index === 2 ? 'h-[300px]' : 'h-[200px]'}
          />
        ))}
      </div>
    </div>
  );
}

function MasonryItem({ movie, isHovered, onHover, onLeave, height }) {
  return (
    <div
      className={`relative ${height} rounded-lg overflow-hidden group`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
        alt={movie.title}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
          isHovered ? 'scale-110 brightness-75' : 'brightness-90'
        }`}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

      <div className="absolute bottom-0 left-0 p-4 w-full">
        <div className="flex items-center space-x-2 mb-1">
          <div className="flex items-center text-yellow-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-3 h-3 fill-yellow-400 mr-1"
            >
              <path d="M12 .587l3.668 7.431 8.332 1.151-6.001 5.852 1.417 8.257L12 18.893l-7.416 3.385 1.417-8.257-6.001-5.852 8.332-1.151z" />
            </svg>
            <span className="text-xs">{movie.vote_average.toFixed(1)}</span>
          </div>
          <span className="text-xs text-gray-300">
            {new Date(movie.release_date).getFullYear() || 'N/A'}
          </span>
        </div>
        <h3 className="text-sm md:text-base font-bold">{movie.title}</h3>
        <p className="text-xs text-gray-300 mt-1 line-clamp-1">Action, Drama</p> {/* Placeholder genres */}
      </div>

      <div
        className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <button className="cursor-pointer bg-red-main p-1 rounded-2xl" size="sm">
          Explore More
        </button>
      </div>
    </div>
  );
}

export default MasonryLayout;