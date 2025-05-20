import { FaRegCalendarAlt, FaClock } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { FaRegCirclePlay } from "react-icons/fa6";
import { TiStarFullOutline } from "react-icons/ti";
import { Heart, BookmarkCheck } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SiteFooter from "../SiteFooter";

export default function MovieDetail() {
  const { user, addToWatchlist, getWatchlist, addToLikes, getLikes, removeFromLikes } = useContext(AuthContext);
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("q") || "";

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [isLiking, setIsLiking] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const BASE_URL = "https://api.themoviedb.org/3";
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  // Fetch movie data, watchlist, and liked movies
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch movie details
        const movieResponse = await fetch(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        if (!movieResponse.ok)
          throw new Error(`Movie error! Status: ${movieResponse.status}`);
        const movieData = await movieResponse.json();

        // Fetch credits
        const creditsResponse = await fetch(
          `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`
        );
        if (!creditsResponse.ok)
          throw new Error(`Credits error! Status: ${creditsResponse.status}`);
        const creditsData = await creditsResponse.json();

        // Fetch videos (trailer)
        const videosResponse = await fetch(
          `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
        );
        if (!videosResponse.ok)
          throw new Error(`Videos error! Status: ${videosResponse.status}`);
        const videosData = await videosResponse.json();

        // Fetch similar movies
        const similarResponse = await fetch(
          `${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`
        );
        if (!similarResponse.ok)
          throw new Error(`Similar error! Status: ${similarResponse.status}`);
        const similarData = await similarResponse.json();

        // Fetch watchlist and liked movies only for authenticated users
        let watchlistIds = [];
        let likedIds = [];
        if (user) {
          try {
            watchlistIds = await getWatchlist();
            likedIds = await getLikes();
            console.log('MovieDetail likedIds:', likedIds);
          } catch (authErr) {
            console.error('Auth fetch error:', authErr.message);
            // Continue with empty arrays to avoid blocking movie data
          }
        }
        setWatchlist(Array.isArray(watchlistIds) ? watchlistIds.map(id => String(id)) : []);
        setLikedMovies(Array.isArray(likedIds) ? likedIds.map(id => String(id)) : []);

        // Map movie data
        const movieFormatted = {
          id: movieData.id,
          title: movieData.title,
          posterUrl: movieData.poster_path
            ? `${IMAGE_BASE_URL}/w500${movieData.poster_path}`
            : "/placeholder.svg",
          backdropUrl: movieData.backdrop_path
            ? `${IMAGE_BASE_URL}/w1280${movieData.backdrop_path}`
            : "/placeholder.svg",
          year: movieData.release_date
            ? movieData.release_date.split("-")[0]
            : "N/A",
          duration: movieData.runtime
            ? `${Math.floor(movieData.runtime / 60)}h ${movieData.runtime % 60}m`
            : "N/A",
          genre: movieData.genres.map((g) => g.name),
          description: movieData.overview || "No description available.",
          rating: movieData.vote_average
            ? movieData.vote_average.toFixed(1)
            : "N/A",
          director:
            creditsData.crew.find((c) => c.job === "Director")?.name ||
            "Unknown Director",
        };

        // Map cast data (limit to 6)
        const castFormatted = creditsData.cast.slice(0, 6).map((member) => ({
          name: member.name,
          role: member.character || "N/A",
          image: member.profile_path
            ? `${IMAGE_BASE_URL}/w200${member.profile_path}`
            : "/placeholder.svg",
        }));

        // Find trailer
        const trailerData = videosData.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        // Map similar movies (limit to 6)
        const similarMoviesFormatted = similarData.results
          .slice(0, 6)
          .map((m) => ({
            id: m.id,
            title: m.title,
            posterUrl: m.poster_path
              ? `${IMAGE_BASE_URL}/w500${m.poster_path}`
              : "/placeholder.svg",
            backdropUrl: m.backdrop_path
              ? `${IMAGE_BASE_URL}/w1280${m.backdrop_path}`
              : "/placeholder.svg",
            year: m.release_date ? m.release_date.split("-")[0] : "N/A",
            duration: "N/A",
            genre: m.genre_ids.map((id) => {
              const genres = {
                28: "Action",
                35: "Comedy",
                18: "Drama",
                878: "Sci-Fi",
              };
              return genres[id] || "Other";
            }),
            description: m.overview || "No description available.",
            rating: m.vote_average ? m.vote_average.toFixed(1) : "N/A",
          }));

        setMovie(movieFormatted);
        setCast(castFormatted);
        setTrailer(trailerData);
        setSimilarMovies(similarMoviesFormatted);
      } catch (err) {
        setError(err.message);
        setMovie(null);
        setCast([]);
        setTrailer(null);
        setSimilarMovies([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, API_KEY, user, getWatchlist, getLikes]);

  const handleAddToWatchlist = async (movieId) => {
    if (!user) {
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

  const handleToggleLike = async (movieId) => {
    if (!user) {
      toast.error("Please log in to like", {
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

    const isLiked = likedMovies.includes(String(movieId));
    setIsLiking(true);

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
      setIsLiking(false);
    }
  };

  // Search results (filtered from similar movies)
  const searchResults = searchQuery
    ? similarMovies
        .filter(
          (m) =>
            m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.genre.some((g) =>
              g.toLowerCase().includes(searchQuery.toLowerCase())
            )
        )
        .slice(0, 4)
    : [];

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black z-50">
        <div className="w-16 h-16 border-4 border-red-main border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="container mx-auto px-4 py-16 bg-black">
        <div className="text-center">
          <h1 classнame="text-3xl font-bold mb-4 text-white-custom">
            {error || "Movie not found"}
          </h1>
          <p className="text-gray-400 mb-8">
            {error
              ? "An error occurred while fetching the movie."
              : "The movie you're looking for doesn't exist or has been removed."}
          </p>
          <button className="bg-red-main text-white-custom px-6 py-2 rounded-md hover:bg-red-main/90">
            <Link to="/">Back to Home</Link>
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-black text-white-custom min-h-screen">
        {/* Hero Section */}
        <div className="relative bg-black">
          <img
            src={movie.backdropUrl}
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="container mx-auto px-4 py-12 relative z-10">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Poster */}
              <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
                <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Movie Info */}
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{movie.title}</h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  {movie.genre.map((genre, index) => (
                    <span
                      key={index}
                      className="bg-red-main text-white-custom px-3 py-1 text-xs rounded-full"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
                  <div className="flex items-center">
                    <TiStarFullOutline className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
                    <span>{movie.rating}/10</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="w-4 h-4 mr-1" />
                    <span>{movie.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <FaRegCalendarAlt className="w-4 h-4 mr-1" />
                    <span>{movie.year}</span>
                  </div>
                  <div className="flex items-center">
                    <span>Director: {movie.director}</span>
                  </div>
                </div>
                <p className="text-gray-400 mb-6">
                  {showFullDescription
                    ? movie.description
                    : `${movie.description.substring(0, 200)}${
                        movie.description.length > 200 ? "..." : ""
                      }`}
                </p>
                {movie.description.length > 200 && (
                  <button
                    className="text-red-main hover:underline mb-4"
                    onClick={() => setShowFullDescription(!showFullDescription)}
                  >
                    {showFullDescription ? "Show Less" : "Read More"}
                  </button>
                )}
                <div className="flex flex-wrap gap-3">
                  <button
                    className={`bg-red-main hover:bg-red-main/90 text-white-custom px-6 py-2 rounded-md flex items-center gap-2 ${
                      likedMovies.includes(String(movie.id)) ? "bg-red-600 hover:bg-red-700" : ""
                    }`}
                    onClick={() => handleToggleLike(movie.id)}
                    disabled={isLiking}
                  >
                    {isLiking ? (
                      <div className="w-5 h-5 border-2 border-white-custom border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Heart
                        className={`w-5 h-5 ${
                          likedMovies.includes(String(movie.id)) ? "fill-red-500" : "fill-none"
                        }`}
                      />
                    )}
                    {likedMovies.includes(String(movie.id)) ? "Liked" : "Like"}
                  </button>
                  <button
                    className={`flex items-center gap-2 px-6 py-2 rounded-md text-white-custom ${
                      watchlist.includes(String(movie.id))
                        ? "bg-green-600 hover:bg-green-700"
                        : "border-gray-700 hover:bg-gray-800 border"
                    }`}
                    onClick={() => handleAddToWatchlist(movie.id)}
                    disabled={watchlist.includes(String(movie.id))}
                  >
                    {watchlist.includes(String(movie.id)) ? (
                      <>
                        <BookmarkCheck className="w-5 h-5" />
                        Added
                      </>
                    ) : (
                      <>
                        <BookmarkCheck className="w-5 h-5" />
                        Watchlist
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trailer */}
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6 text-white-custom">Trailer</h2>
          <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden">
            {trailer ? (
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={`${movie.title} trailer`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            ) : (
              <div className="relative w-full h-full group">
                <img
                  src={movie.backdropUrl}
                  alt={`${movie.title} trailer`}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-opacity"></div>
                <button className="absolute inset-0 flex items-center justify-center">
                  <FaRegCirclePlay className="h-12 w-12 text-white-custom group-hover:scale-110 transition-transform duration-300" />
                  <span className="sr-only">Play trailer</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Cast */}
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6 text-white-custom">Cast</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {cast.map((person, index) => (
              <div key={index} className="group">
                <div className="relative aspect-square rounded-xl overflow-hidden mb-2">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-medium text-white-custom">{person.name}</h3>
                <p className="text-sm text-gray-400">{person.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Search Results (if coming from search) */}
        {searchResults.length > 0 && (
          <div className="container mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold mb-6 text-white-custom">
              More Results for "{searchQuery}"
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {searchResults.map((movie) => (
                <Link
                  to={`/movie/${movie.id}?q=${encodeURIComponent(searchQuery)}`}
                  key={movie.id}
                >
                  <div className="bg-gray-900 rounded-xl overflow-hidden hover:bg-gray-800 transition-colors">
                    <div className="relative aspect-[2/3]">
                      <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-white-custom line-clamp-1">{movie.title}</h3>
                      <div className="flex items-center text-xs text-gray-400 mt-1">
                        <span>{movie.year}</span>
                        <span className="mx-1">•</span>
                        <span>{movie.duration}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <TiStarFullOutline className="w-3 h-3 text-yellow-400 fill-yellow-400 mr-1" />
                        <span className="text-xs">{movie.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              <button className="w-full border border-gray-700 hover:bg-gray-800 text-white-custom px-4 py-2 rounded-md">
                <Link to={`/search?q=${encodeURIComponent(searchQuery)}`}>
                  View All Results
                </Link>
              </button>
            </div>
          </div>
        )}

        {/* Similar Movies */}
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6 text-white-custom">You May Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {similarMovies.map((movie) => (
              <Link to={`/movie/${movie.id}`} key={movie.id}>
                <div className="group rounded-lg overflow-hidden">
                  <div className="relative aspect-[2/3]">
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button className="bg-red-main hover:bg-red-main/90 text-white-custom px-4 py-1 rounded-md flex items-center gap-2">
                        <FaRegCirclePlay className="h-4 w-4" />
                        Watch
                      </button>
                    </div>
                  </div>
                  <h3 className="font-medium text-sm text-white-custom mt-2 line-clamp-1">{movie.title}</h3>
                  <div className="flex items-center text-xs text-gray-400">
                    <TiStarFullOutline className="w-3 h-3 text-yellow-400 fill-yellow-400 mr-1" />
                    <span>{movie.rating}</span>
                    <span className="mx-1">•</span>
                    <span>{movie.year}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}