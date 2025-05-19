import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, BookmarkCheck, Heart } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import CustomLoader from '../cusloader';

function HeroGrid({ apiKey }) {
  const navigate = useNavigate();
  const { addToWatchlist, getWatchlist, addToLikes, getLikes, removeFromLikes } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]); // Track watchlist movie IDs
  const [likedMovies, setLikedMovies] = useState([]); // Track liked movie IDs
  const [isLiking, setIsLiking] = useState({}); // Track liking status per movie
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Fetch movies, watchlist, and liked movies
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        // Fetch popular movies
        const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=2`;
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setMovies(data.results || []);

        // Fetch watchlist
        const watchlistIds = await getWatchlist();
        setWatchlist(watchlistIds.map(id => String(id)));

        // Fetch liked movies
        const likedIds = await getLikes();
        setLikedMovies(likedIds.map(id => String(id)));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [apiKey, getWatchlist, getLikes]);

  const handleAddToWatchlist = async (movieId) => {
    try {
      const result = await addToWatchlist(movieId);
      setWatchlist((prev) => [...prev, String(movieId)]);
      toast.success(result.message || "Movie added to watchlist", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } catch (err) {
      toast.error(err.message || "Failed to add to watchlist", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  const handleToggleLike = async (movieId) => {
    const isLiked = likedMovies.includes(String(movieId));
    setIsLiking((prev) => ({ ...prev, [movieId]: true }));

    try {
      if (isLiked) {
        // Unlike
        const result = await removeFromLikes(String(movieId));
        setLikedMovies((prev) => prev.filter((id) => id !== String(movieId)));
        toast.success(result.message || "Movie removed from likes", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      } else {
        // Like
        const result = await addToLikes(String(movieId));
        setLikedMovies((prev) => [...prev, String(movieId)]);
        toast.success(result.message || "Added to likes", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      }
    } catch (err) {
      toast.error(err.message || `Failed to ${isLiked ? 'remove from' : 'add to'} likes`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } finally {
      setIsLiking((prev) => ({ ...prev, [movieId]: false }));
    }
  };

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

  const mainFeature = selectedMovie || movies[0];
  const gridMovies = movies.slice(1, 5);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px]">
      {/* Main Feature - Takes up 2 columns */}
      <div
        className="relative md:col-span-2 rounded-xl overflow-hidden h-[300px] md:h-full"
        onClick={() => setSelectedMovie(null)}
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
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-white-custom ${
                likedMovies.includes(String(mainFeature.id))
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-red-main hover:bg-red-main/90'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleToggleLike(mainFeature.id);
              }}
              disabled={isLiking[mainFeature.id]}
            >
              {isLiking[mainFeature.id] ? (
                <div className="w-4 h-4 border-2 border-white-custom border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Heart
                  className={`w-4 h-4 ${
                    likedMovies.includes(String(mainFeature.id)) ? 'fill-red-500' : 'fill-none'
                  }`}
                />
              )}
              {likedMovies.includes(String(mainFeature.id)) ? 'Liked' : 'Like'}
            </button>
            <button
              className="cursor-pointer border-gray-700 hover:bg-gray-800 text-white-custom px-4 py-2 rounded-md border flex items-center gap-2"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/movie/${mainFeature.id}`);
              }}
            >
              More Info
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-white-custom ${
                watchlist.includes(String(mainFeature.id))
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'border-gray-700 hover:bg-gray-800 border'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleAddToWatchlist(mainFeature.id);
              }}
              disabled={watchlist.includes(String(mainFeature.id))}
            >
              {watchlist.includes(String(mainFeature.id)) ? (
                <>
                  <BookmarkCheck className="w-4 h-4" />
                  Added
                </>
              ) : (
                <>
                  Watchlist
                </>
              )}
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
            onClick={() => setSelectedMovie(movie)}
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