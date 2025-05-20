import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiInfo } from 'react-icons/fi';
import { BookmarkCheck, Heart } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import CustomLoader from '../cusloader';

function FeaturedSpotlight({ apiKey }) {
  const navigate = useNavigate();
  const { addToWatchlist, getWatchlist, addToLikes, getLikes, removeFromLikes } = useContext(AuthContext);
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [isLiking, setIsLiking] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch movie, watchlist, and liked movies
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // Fetch popular movie
        const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setMovie(data.results[0] || null);

        // Fetch watchlist
        const watchlistIds = await getWatchlist();
        setWatchlist(Array.isArray(watchlistIds) ? watchlistIds.map(id => String(id)) : []);

        // Fetch liked movies
        const likedIds = await getLikes();
        console.log('FeaturedSpotlight likedIds:', likedIds);
        setLikedMovies(Array.isArray(likedIds) ? likedIds.map(id => String(id)) : []);
      } catch (err) {
        console.error('FeaturedSpotlight fetchData error:', err.message);
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
      toast.error("Please log in to add to watchlist", {
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
      toast.error( `Failed to ${isLiked ? 'remove from' : 'add to'} likes`, {
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

  if (loading) {
    return <CustomLoader />;
  }

  if (!movie) return null;

  return (
    <div
      className="relative h-[500px] rounded-xl overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image with Parallax Effect */}
      <div
        className="absolute inset-0 transition-transform duration-1000 ease-out"
        style={{
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w1920${movie.backdrop_path}`}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left side - Text content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="bg-red-main px-2 py-0.5 text-xs font-semibold rounded text-white">
                  NEW RELEASE
                </span>
                <span className="text-sm text-gray-300">
                  {new Date(movie.release_date).getFullYear() || 'N/A'}
                </span>
                <span className="text-sm text-gray-300">N/A</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">{movie.title}</h1>
              <div className="flex items-center space-x-3 text-sm">
                <span className="text-yellow-400 font-medium">{movie.vote_average.toFixed(1)}/10</span>
                <span className="text-gray-300">Action, Adventure</span>
              </div>
            </div>

            <p className="text-gray-300 text-lg max-w-xl line-clamp-4 md:line-clamp-none">
              {movie.overview}
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                className="border-white/20 hover:bg-white/10 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg flex items-center gap-2 text-sm md:text-base"
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                <FiInfo className="w-4 h-4 md:w-5 md:h-5" />
                More Info
              </button>
              <button
                className={`flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm md:text-base text-white ${
                  watchlist.includes(String(movie.id))
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'border-white/20 hover:bg-white/10'
                }`}
                onClick={() => handleAddToWatchlist(movie.id)}
                disabled={watchlist.includes(String(movie.id))}
              >
                {watchlist.includes(String(movie.id)) ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 md:w-5 md:h-5" />
                    Added
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4 md:w-5 md:h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Watchlist
                  </>
                )}
              </button>
              <button
                className={`flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm md:text-base text-white ${
                  likedMovies.includes(String(movie.id))
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'border-white/20 hover:bg-white/10'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleToggleLike(movie.id);
                }}
                disabled={isLiking[movie.id]}
              >
                {isLiking[movie.id] ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Heart
                    className={`w-4 h-4 md:w-5 md:h-5 ${
                      likedMovies.includes(String(movie.id)) ? 'fill-red-500' : 'fill-none'
                    }`}
                  />
                )}
                {likedMovies.includes(String(movie.id)) ? 'Liked' : 'Like'}
              </button>
            </div>
          </div>

          {/* Right side - Poster (hidden on mobile) */}
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
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedSpotlight;