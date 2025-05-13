import { useState, useEffect } from 'react';
import CustomLoader from './cusloader';

function TopRatedSection({ apiKey }) {
  const [movies, setMovies] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        const API_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`;
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setMovies(data.results.slice(0, 6) || []); // Fetch top 3 top-rated movies
      } catch (err) {
        console.error('Error fetching movies:', err);
      }finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, [apiKey]);

  if (isLoading) return <CustomLoader />;

  if (!movies || movies.length < 6) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {movies.map((movie, index) => (
        <div
          key={movie.id}
          className="bg-gray-900 rounded-lg overflow-hidden group"
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
            />

            {/* Rating circle */}
            <div className="absolute -bottom-5 left-4 h-10 w-10 rounded-full bg-gray-900 border-2 border-red-600 flex items-center justify-center">
              <div className="text-sm font-bold">{movie.vote_average.toFixed(1)}</div>
            </div>

            {/*  overlay */}
            <div
              className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
                hoveredIndex === index ? 'opacity-100' : 'opacity-0'
              }`}
            >
             
            </div>
          </div>

          <div className="p-4 pt-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg mb-1">{movie.title}</h3>
                <div className="flex items-center text-sm text-gray-400">
                  <span>{new Date(movie.release_date).getFullYear() || 'N/A'}</span>
                  <span className="mx-2">•</span>
                  <span>N/A</span> {/* Placeholder for duration */}
                </div>
              </div>

              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className={`w-4 h-4 ${
                      star <= Math.floor(movie.vote_average / 2)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-600'
                    }`}
                  >
                    <path d="M12 .587l3.668 7.431 8.332 1.151-6.001 5.852 1.417 8.257L12 18.893l-7.416 3.385 1.417-8.257-6.001-5.852 8.332-1.151z" />
                  </svg>
                ))}
              </div>
            </div>

            <p className="text-sm text-gray-400 mt-3 line-clamp-2">{movie.overview}</p>

            <div className="mt-4 flex space-x-2 ">
              <button className="cursor-pointer flex-1 bg-red-600 hover:bg-red-600/90 text-white px-3 py-1 rounded text-sm">
                Explore More
              </button>
              <button className="cursor-pointer flex-1 border-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded text-sm">
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