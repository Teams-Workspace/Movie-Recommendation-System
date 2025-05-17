import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import CustomLoader from './cusloader';

function TopRatedSection({ apiKey }) {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError(null);
        const API_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`;
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const topMovies = data.results.slice(0, 6); // Top 6 movies

        // Fetch durations for each movie
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

    fetchMovies();
  }, [apiKey]);

  if (isLoading) return <CustomLoader />;

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-red-500 text-center">Error fetching movies: {error}</p>
      </div>
    );
  }

  if (!movies || movies.length < 6) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {movies.map((movie, index) => (
        <div
          key={movie.id}
          className="bg-gray-950 rounded-lg overflow-hidden group"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="relative h-48">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.title}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                hoveredIndex === index ? 'scale-110' : ''
              }`}
              loading="lazy"
            />

            {/* Rating circle */}
            <div className="absolute -bottom-5 left-4 h-10 w-10 rounded-full bg-gray-950 border-2 border-red-main flex items-center justify-center">
              <div className="text-sm font-bold text-white-custom">{movie.vote_average.toFixed(1)}</div>
            </div>

            {/* Overlay */}
            <div
              className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
                hoveredIndex === index ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>

          <div className="p-4 pt-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg mb-1 text-white-custom">{movie.title}</h3>
                <div className="flex items-center text-sm text-gray-400">
                  <span>{new Date(movie.release_date).getFullYear() || 'N/A'}</span>
                  <span className="mx-2">•</span>
                  <span>
                    {movie.runtime
                      ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
                      : 'N/A'}
                  </span>
                </div>
              </div>

              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.floor(movie.vote_average / 2)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-gray-600 text-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>

            <p className="text-sm text-gray-400 mt-3 line-clamp-2">{movie.overview}</p>

            <div className="mt-4 flex space-x-2">
              <button
                className="cursor-pointer flex-1 bg-red-main hover:bg-red-main/90 text-white-custom px-3 py-1 rounded-md text-sm"
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                Explore More
              </button>
              <button className="flex-1 border-gray-700 hover:bg-gray-800 text-white-custom px-3 py-1 rounded-md text-sm">
                Add to List
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TopRatedSection;