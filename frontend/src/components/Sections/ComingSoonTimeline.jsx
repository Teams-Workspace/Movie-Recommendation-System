import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, BookmarkCheck } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS
import CustomLoader from '../cusloader';

function ComingSoonTimeline({ apiKey }) {
  const navigate = useNavigate();
  const { user, addToWatchlist, getWatchlist } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch movies and watchlist
  useEffect(() => {
  

    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch upcoming movies
        const API_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`;
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        // Filter movies with release dates after May 13, 2025, and limit to 5
        const upcomingMovies = data.results
          .filter((movie) => new Date(movie.release_date) > new Date('2025-05-13'))
          .slice(0, 5);

        // Fetch details for genres and duration
        const moviesWithDetails = await Promise.all(
          upcomingMovies.map(async (movie) => {
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
              genre_ids: detailData.genres.map((g) => g.id),
            };
          })
        );

        // Fetch watchlist only for authenticated users
        let watchlistIds = [];
        if (user) {
          try {
            watchlistIds = await getWatchlist();
            //console.log('ComingSoonTimeline watchlistIds:', watchlistIds);
          } catch (authErr) {
            console.error('Auth fetch error:', authErr.message);
          }
        }
        setWatchlist(Array.isArray(watchlistIds) ? watchlistIds.map(id => String(id)) : []);
        setMovies(moviesWithDetails);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [apiKey, user, getWatchlist]);

  const handleAddToWatchlist = async (movieId) => {
    //console.log('handleAddToWatchlist called, user:', user);
    if (!user) {
      //console.log('Showing toast for unauthorized watchlist attempt');
      toast.error("Please log in to add to watchlist", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return;
    }

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
    <div className="relative">
      {/* Background with blur effect */}
      <div className="absolute inset-0 -z-10 opacity-20 blur-xl">
        <img
          src={`https://image.tmdb.org/t/p/w1280${activeMovie.backdrop_path}`}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 bg-black/50 p-6 rounded-xl backdrop-blur-sm">
        {/* Left side - Movie details */}
        <div className="space-y-4">
          <div className="inline-block bg-red-main/20 text-red-main px-3 py-1 rounded-full text-sm font-medium">
            Coming Soon
          </div>

          <h3 className="text-3xl font-bold text-white-custom">{activeMovie.title}</h3>

          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1 text-white-custom" />
              <span className="text-white-custom">{activeMovie.release_date}</span>
            </div>
            <span>{duration}</span>
            <span>{genres}</span>
          </div>

          <p className="text-gray-300">{activeMovie.overview}</p>

          <div className="flex space-x-3 pt-2">
            <button
              className="bg-red-main hover:bg-red-main/90 text-white-custom px-4 py-2 rounded-md"
              onClick={() => navigate(`/movie/${activeMovie.id}`)}
            >
              More Info
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-white-custom ${
                watchlist.includes(String(activeMovie.id))
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'border-gray-700 hover:bg-gray-800 border'
              }`}
              onClick={() => handleAddToWatchlist(activeMovie.id)}
              disabled={watchlist.includes(String(activeMovie.id))}
            >
              {watchlist.includes(String(activeMovie.id)) ? (
                <>
                  <BookmarkCheck className="w-5 h-5" />
                  Added
                </>
              ) : (
                <>
                  <BookmarkCheck className="w-5 h-5" />
                  Add to Watchlist
                </>
              )}
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
                        ? 'border-red-main bg-red-main text-white-custom'
                        : 'border-gray-600 bg-gray-800 text-white-custom'
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
                        loading="lazy"
                      />
                    </div>

                    <div>
                      <h4 className="font-medium text-white-custom">{movie.title}</h4>
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