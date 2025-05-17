import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info } from 'lucide-react';
import CustomLoader from './cusloader';

function InteractivePosterGallery({ apiKey }) {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPopularMovies() {
      try {
        setIsLoading(true);
        setError(null);
        const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=8`;
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const topMovies = data.results.slice(0, 5); // Limit to 5 movies

        // Fetch details for genres and duration
        const moviesWithDetails = await Promise.all(
          topMovies.map(async (movie) => {
            const detailResponse = await fetch(
              `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=en-US`
            );
            if (!detailResponse.ok) {
              throw new Error(`Failed to fetch details for movie ${movie.id}`);
            }
            const detailData = await detailResponse.json();
            return {
              ...movie,
              runtime: detailData.runtime || 0,
              genre_ids: detailData.genres.map((g) => g.id), // TMDB /movie/:id uses genres
            };
          })
        );

        setMovies(moviesWithDetails);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPopularMovies();
  }, [apiKey]);

  // Auto-rotate when not hovering
  useEffect(() => {
    if (isHovering) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovering, movies.length]);

  if (isLoading) return <CustomLoader />;

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-red-500 text-center">Error fetching movies: {error}</p>
      </div>
    );
  }

  if (!movies || !movies.length) return null;

  const activeMovie = movies[activeIndex];

  // Map genres
  const genres = activeMovie.genre_ids
    .map((id) => {
      const genreMap = {
        28: 'Action',
        35: 'Comedy',
        18: 'Drama',
        878: 'Sci-Fi',
        10749: 'Romance',
        53: 'Thriller',
      };
      return genreMap[id] || 'Other';
    })
    .slice(0, 2)
    .join(', ') || 'N/A';

  // Format duration
  const duration = activeMovie.runtime
    ? `${Math.floor(activeMovie.runtime / 60)}h ${activeMovie.runtime % 60}m`
    : 'N/A';

  return (
    <div
      className="relative h-[500px] rounded-xl overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background Image - Changes on hover */}
      {movies.map((movie, index) => (
        <div
          key={`bg-${movie.id}`}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === activeIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left side - Text content */}
          <div className="space-y-6 z-10">
            {movies.map((movie, index) => (
              <div
                key={`content-${movie.id}`}
                className={`transition-all duration-700 ${
                  index === activeIndex ? 'opacity-100 translate-y-0' : 'absolute opacity-0 translate-y-8'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="bg-red-main px-2 py-0.5 text-xs font-semibold rounded text-white-custom">
                      FEATURED
                    </span>
                    <span className="text-sm text-gray-400">
                      {new Date(movie.release_date).getFullYear() || 'N/A'}
                    </span>
                    <span className="text-sm text-gray-400">{duration}</span>
                  </div>

                  <h1 className="text-3xl md:text-4xl font-bold text-white-custom">{movie.title}</h1>

                  <div className="flex items-center space-x-3 text-sm">
                    <span className="text-yellow-400 font-medium">{movie.vote_average.toFixed(1)}/10</span>
                    <span className="text-gray-400">{genres}</span>
                  </div>

                  <p className="text-gray-300 text-lg max-w-xl line-clamp-4">{movie.overview}</p>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      className="bg-red-main hover:bg-red-main/90 text-white-custom px-4 py-2 rounded-md flex items-center gap-2"
                    >
                      Add to Watchlist
                    </button>
                    <button
                      className="border-gray-700 hover:bg-gray-800 text-white-custom px-4 py-2 rounded-md flex items-center gap-2"
                      onClick={() => navigate(`/movie/${movie.id}`)}
                    >
                      <Info className="w-5 h-5" />
                      More Info
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Interactive Posters */}
          <div className="hidden md:flex justify-end items-center">
            <div className="relative h-[400px] w-[300px]">
              {movies.map((movie, index) => {
                // Calculate position based on index relative to active index
                const position = (index - activeIndex + movies.length) % movies.length;
                let style = {};

                if (position === 0) {
                  // Active poster
                  style = {
                    zIndex: 30,
                    transform: 'translateX(0) scale(1) rotateY(0deg)',
                    filter: 'brightness(100%)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9)',
                  };
                } else if (position === 1 || position === movies.length - 1) {
                  // Side posters
                  const direction = position === 1 ? 1 : -1;
                  style = {
                    zIndex: 20,
                    transform: `translateX(${direction * 50}%) scale(0.8) rotateY(${direction * 15}deg)`,
                    filter: 'brightness(70%)',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
                  };
                } else {
                  // Hidden posters
                  const direction = position <= movies.length / 2 ? 1 : -1;
                  style = {
                    zIndex: 10,
                    transform: `translateX(${direction * 100}%) scale(0.6) rotateY(${direction * 30}deg)`,
                    filter: 'brightness(40%)',
                    opacity: 0,
                  };
                }

                return (
                  <div
                    key={`poster-${movie.id}`}
                    className="absolute top-0 left-0 w-full h-full transition-all duration-700 ease-out cursor-pointer"
                    style={style}
                    onClick={() => setActiveIndex(index)}
                  >
                    <div className="relative w-full h-full rounded-lg overflow-hidden">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {movies.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === activeIndex ? 'bg-red-main w-6' : 'bg-gray-600'
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <span className="sr-only">View movie {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default InteractivePosterGallery;