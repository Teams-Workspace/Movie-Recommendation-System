  import { useState, useEffect, useRef, useContext } from 'react';
  import { Link, useNavigate } from 'react-router-dom';
  import { gsap } from 'gsap';
  import { Play, Star, Heart, Trash2 } from 'lucide-react';
  import { AuthContext } from '../../context/AuthContext';
  import { toast } from 'react-toastify';
  import SiteFooter from '../SiteFooter';

  function Likes() {
    const { user, getLikes, removeFromLikes: removeFromLikes } = useContext(AuthContext);
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isRemoving, setIsRemoving] = useState({}); // Track removal status per movie

    // Refs for GSAP animations
    const headerRef = useRef(null);
    const contentRef = useRef(null);
    const emptyStateRef = useRef(null);

    const BASE_URL = 'https://api.themoviedb.org/3';
    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    // Fetch liked movies
    useEffect(() => {
      if (!user) {
        navigate('/login');
        return;
      }

      const fetchLikedMovies = async () => {
        setIsLoading(true);
        setError(null);

        try {
          const likedIds = await getLikes();
          if (!likedIds.length) {
            setMovies([]);
            return;
          }

          // Fetch movie details for each movieId
          const likedMovies = await Promise.all(
            likedIds.map(async (movieId) => {
              const response = await fetch(
                `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
              );
              if (!response.ok)
                throw new Error(`Error fetching movie ${movieId}: ${response.status}`);
              const m = await response.json();
              return {
                id: m.id,
                title: m.title,
                posterUrl: m.poster_path
                  ? `${IMAGE_BASE_URL}/w500${m.poster_path}`
                  : '/placeholder.svg',
                backdropUrl: m.backdrop_path
                  ? `${IMAGE_BASE_URL}/w1280${m.backdrop_path}`
                  : '/placeholder.svg',
                year: m.release_date ? m.release_date.split('-')[0] : 'N/A',
                duration: m.runtime
                  ? `${Math.floor(m.runtime / 60)}h ${m.runtime % 60}m`
                  : 'N/A',
                genre: m.genres.map((g) => g.name).slice(0, 2),
                description: m.overview || 'No description available.',
                rating: m.vote_average ? m.vote_average.toFixed(1) : 'N/A',
              };
            })
          );

          setMovies(likedMovies);
        } catch (err) {
          setError(err.message);
          setMovies([]);
        } finally {
          setIsLoading(false);
        }
      };

      fetchLikedMovies();
    }, [user, navigate, API_KEY, getLikes]);

    // GSAP animations
    useEffect(() => {
      if (isLoading) return;

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (movies.length === 0 && emptyStateRef.current) {
        tl.fromTo(
          emptyStateRef.current.children,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.8 }
        );
      } else {
        tl.fromTo(
          headerRef.current,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 }
        ).fromTo(
          contentRef.current?.children,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.05, duration: 0.6 },
          '-=0.3'
        );
      }
    }, [isLoading, movies.length]);

    const removeFromLiked = async (movieId, movieTitle) => {

      setIsRemoving((prev) => ({ ...prev, [movieId]: true }));
      try {
        const result = await removeFromLikes(String(movieId));
        setMovies((prev) => prev.filter((movie) => movie.id !== movieId));
        toast.success(result.message, {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'dark',
        });
      } catch (err) {
        toast.error(err.message || 'Failed to remove from likes', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'dark',
        });
      } finally {
        setIsRemoving((prev) => ({ ...prev, [movieId]: false }));
      }
    };

    if (isLoading) {
      return (
        <div className="fixed inset-0 flex justify-center items-center bg-black z-50">
          <div className="w-16 h-16 border-4 border-red-main border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
    }

    if (error) {
      return (
        <main className="min-h-screen bg-black text-white overflow-hidden">
        <div className="container mx-auto px-4 py-16 mt-8 bg-black text-white-custom">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Error</h1>
            <p className="text-gray-400 mb-8">{error}</p>
            <button className="bg-red-main text-white-custom px-6 py-2 rounded-md hover:bg-red-main/90">
              <Link to="/">Back to Home</Link>
            </button>
          </div>
        </div>
        </main>
      );
    }

    if (movies.length === 0) {
      return (
        <main className="min-h-screen bg-black text-white overflow-hidden">
          <div ref={emptyStateRef} className="container mx-auto px-4 py-16 mt-8 bg-black text-white-custom">
            <div className="max-w-2xl mx-auto text-center">
              <div className="mb-6 flex justify-center">
                <div className="relative h-32 w-32 opacity-30">
                  <Heart className="h-full w-full" />
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-4">Your liked movies list is empty</h1>
              <p className="text-gray-400 mb-8">Start exploring and liking movies to build your personalized collection.</p>
              <button className="bg-red-main text-white-custom px-6 py-2 rounded-md hover:bg-red-main/90">
                <Link to="/">Discover Movies</Link>
              </button>
            </div>
            </div>
          </main>
        );
    }

    return (
      <main className="min-h-screen bg-black text-white overflow-hidden">
        <div className="min-h-screen bg-black text-white-custom pb-16">
          {/* Background gradient */}
          <div className="fixed inset-0 z-0 bg-gradient-to-b from-red-main/20 via-black/50 to-black"></div>

          <div className="relative z-10 container mx-auto px-4 py-16 mt-8">
            <div
              ref={headerRef}
              className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
            >
              <div>
                <h1 className="text-3xl font-bold">My Liked Movies</h1>
                <p className="text-gray-400 mt-1">{movies.length} movies in your collection</p>
              </div>
            </div>

            <div ref={contentRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {movies.map((movie) => (
                <div key={movie.id} className="group relative">
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      className="object-cover w-full h-full transition-all duration-500 group-hover:scale-110 group-hover:brightness-75"
                      loading="lazy"
                    />
                    <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70 text-red-500 flex items-center justify-center"
                        onClick={(e) => {
                          e.preventDefault();
                          removeFromLiked(movie.id, movie.title);
                        }}
                        disabled={isRemoving[movie.id]}
                      >
                        {isRemoving[movie.id] ? (
                          <div className="w-4 h-4 border-2 border-white-custom border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                        <span className="sr-only">Remove from liked</span>
                      </button>
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Link to={`/movie/${movie.id}`}>
                        <button className="bg-red-main hover:bg-red-main/90 text-white-custom px-4 py-1 rounded-md">
                          <Play className="w-4 h-4 fill-current mr-1 inline" /> Watch
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Link to={`/movie/${movie.id}`} className="block">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center text-yellow-400">
                          <Star className="w-3 h-3 fill-yellow-400 mr-1" />
                          <span className="text-xs">{movie.rating}</span>
                        </div>
                        <span className="text-xs text-gray-400">{movie.year}</span>
                      </div>
                      <h3 className="text-sm font-medium line-clamp-1">{movie.title}</h3>
                      <p className="text-xs text-gray-400 mt-1">{movie.genre.slice(0, 2).join(', ')}</p>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="relative w-full">
          <SiteFooter />
        </div>
      </main>
    );
  }

  export default Likes;