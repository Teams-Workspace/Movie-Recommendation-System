import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import CustomLoader from '../cusloader';

function HeroGrid({ apiKey }) {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

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
      <div className="h-screen bg-black flex items-center justify-center">
        <p className="text-red-500 text-center">Error fetching movies: {error}</p>
      </div>
    );
  }

  if (loading) {
    return <CustomLoader />;
  }

  if (!movies || movies.length < 5) return null;

  const mainFeature = selectedMovie || movies[0]; // Show selected movie or default first movie
  const gridMovies = movies.slice(1, 5);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px]">
      {/* Main Feature - Takes up 2 columns */}
      <div
        className="relative md:col-span-2 rounded-xl overflow-hidden h-[300px] md:h-full"
        onClick={() => setSelectedMovie(null)} // Reset to default on click
      >
        <img
          src={`https://image.tmdb.org/t/p/w1920${mainFeature.backdrop_path}`}
          alt={mainFeature.title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />

        <div className="absolute bottom-0 left-0 p-6 w-full">
          <div className="flex items-center space-x-2 mb-2">
            <span className="bg-red-main px-2 py-0.5 text-xs font-semibold rounded text-white-custom">
              FEATURED
            </span>
            <div className="flex items-center text-yellow-400">
              <Star className="w-4 h-4 fill-yellow-400 mr-1" />
              <span className="text-sm">{mainFeature.vote_average.toFixed(1)}</span>
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white-custom">{mainFeature.title}</h3>
          <p className="text-sm text-gray-300 mb-4 line-clamp-2 md:line-clamp-3">{mainFeature.overview}</p>
          <div className="flex space-x-3">
            <button className="bg-red-main hover:bg-red-main/90 text-white-custom px-4 py-2 rounded-md">
              Like
            </button>
            <button
              className="cursor-pointer border-gray-700 hover:bg-gray-800 text-white-custom px-4 py-2 rounded-md border"
              onClick={() => navigate(`/movie/${mainFeature.id}`)}
            >
              More Info
            </button>
            <button className="border-gray-700 hover:bg-gray-800 text-white-custom px-4 py-2 rounded-md border">
              Watchlist
            </button>
          </div>
        </div>
      </div>

      {/* Grid of 4 movies - Takes up 1 column */}
      <div className="grid grid-cols-2 md:grid-cols-1 gap-4 h-[300px] md:h-full">
        {gridMovies.map((movie) => (
          <div
            key={movie.id}
            className="relative rounded-xl overflow-hidden cursor-pointer"
            onClick={() => setSelectedMovie(movie)} // Set selected movie on click
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />

            <div className="absolute bottom-0 left-0 p-3 w-full">
              <div className="flex items-center space-x-2 mb-1">
                <div className="flex items-center text-yellow-400">
                  <Star className="w-3 h-3 fill-yellow-400 mr-1" />
                  <span className="text-xs">{movie.vote_average.toFixed(1)}</span>
                </div>
              </div>
              <h3 className="text-sm font-bold text-white-custom">{movie.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeroGrid;