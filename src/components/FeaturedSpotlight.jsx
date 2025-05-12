import { useState, useEffect } from 'react';

function FeaturedSpotlight({ apiKey }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setMovie(data.results[0] || null); // Use the first movie from the current popular list
      } catch (err) {
        console.error('Error fetching movie:', err);
      }
    }

    fetchMovie();
  }, [apiKey]);

  if (!movie) return null;

  return (
    <div
      className="relative h-[500px] rounded-xl overflow-hidden "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image with Parallax Effect */}
      <div
        className="absolute inset-0 transition-transform duration-10000 ease-out"
        style={{
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w1920${movie.backdrop_path}`}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left side - Text content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="bg-red-main px-2 py-0.5 text-xs font-semibold rounded text-white">NEW RELEASE</span>
                <span className="text-sm text-gray-300">
                  {new Date(movie.release_date).getFullYear() || 'N/A'}
                </span>
                <span className="text-sm text-gray-300">N/A</span> {/* Placeholder for duration */}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">{movie.title}</h1>
              <div className="flex items-center space-x-3 text-sm">
                <span className="text-yellow-400 font-medium">{movie.vote_average.toFixed(1)}/10</span>
                <span className="text-gray-300">Action, Adventure</span> {/* Placeholder genres */}
              </div>
            </div>

            <p className="text-gray-300 text-lg max-w-xl line-clamp-4 md:line-clamp-none">{movie.overview}</p>

            <div className="flex flex-col md:flex-row gap-3">
              <button className="border-white/20 hover:bg-white/10 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add to Watchlist
              </button>
              <button className="border-white/20 hover:bg-white/10 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                Like
              </button>
            </div>
          </div>

          {/* Right side - Poster with animation */}
          <div className="hidden md:flex justify-end items-center">
            <div
              className="relative w-[220px] h-[330px] rounded-lg overflow-hidden shadow-2xl transform transition-all duration-500"
              style={{
                transform: isHovered ? 'translateY(-10px) rotate(3deg)' : 'translateY(0) rotate(0)',
                boxShadow: isHovered
                  ? '0 25px 50px -12px rgba(0, 0, 0, 0.9)'
                  : '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedSpotlight;