import { NavLink, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "../api/apicalls";
import { MovieDetailSkeleton } from "../components/UI/Skeleton/MovieDetailSkeleton";
import { ErrorUi } from "../components/UI/ErrorUi";
import { formatDate, convertMinutesToHours } from "../utils/formatting";
import { Star, Clock, Play, Heart, Bookmark, Share2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { addLike, removeLike } from "../features/likesSlice/likesSlice";
import {
  addToWatchlist,
  removeFromWatchlist,
} from "../features/watchlistSlice/watchlistSlice";

export const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { likedMovies = [] } = useSelector((state) => state.likes); // Fixed: Use likedMovies
  const { watchlist = [] } = useSelector((state) => state.watchlist);

  const {
    data: movie,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["movieDetails", id],
    queryFn: () => getMovieDetails(id),
  });

  if (isLoading) return <MovieDetailSkeleton />;
  if (isError) return <ErrorUi error={error} />;

  const isLiked = movie?.id ? likedMovies.includes(movie.id.toString()) : false;
  const isInWatchlist = movie?.id ? watchlist.includes(movie.id.toString()) : false;

  const handleLike = async () => {
    if (!user) {
      toast.error("Please log in to like movies");
      return;
    }

    if (!movie?.id) {
      toast.error("Movie data not available");
      return;
    }

    try {
      if (isLiked) {
        await dispatch(removeLike(movie.id.toString())).unwrap();
        toast.success("Removed from likes");
      } else {
        await dispatch(addLike(movie.id.toString())).unwrap();
        toast.success("Added to likes");
      }
    } catch (error) {
      console.error("Like error:", error);
      toast.error(error.message || "Failed to update likes");
    }
  };

  const handleWatchlist = async () => {
    if (!user) {
      toast.error("Please log in to manage watchlist");
      return;
    }

    if (!movie?.id) {
      toast.error("Movie data not available");
      return;
    }

    try {
      if (isInWatchlist) {
        await dispatch(removeFromWatchlist(movie.id.toString())).unwrap();
        toast.success("Removed from watchlist");
      } else {
        await dispatch(addToWatchlist(movie.id.toString())).unwrap();
        toast.success("Added to watchlist");
      }
    } catch (error) {
      toast.error(error.message || "Failed to update watchlist");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Backdrop Image */}
      {movie?.backdrop_path && (
        <div className="relative h-96 w-full bg-gradient-to-b from-gray-800 to-gray-900">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="h-20 w-20 rounded-full bg-primary/80 border-4 border-white flex items-center justify-center hover:bg-primary transition-all">
              <Play className="h-10 w-10 text-white fill-current" />
            </button>
          </div>
        </div>
      )}

      {/* Movie Content */}
      <div className="container mx-auto px-4 relative -mt-16">
        {/* Poster and Basic Info */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="aspect-[2/3] rounded-lg bg-gray-800 shadow-xl relative overflow-hidden">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                alt={movie?.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Movie Info */}
          <div className="w-full md:w-2/3 lg:w-3/4 space-y-6">
            {/* Title */}
            <div>
              <h1 className="text-4xl font-bold mb-2">{movie?.title}</h1>
              <p className="text-gray-400">
                {movie?.release_date && formatDate(movie.release_date)} •{" "}
                {movie?.original_language?.toUpperCase()}
              </p>
            </div>

            {/* Rating and Metadata */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span>
                  {movie?.vote_average?.toFixed(1)} (
                  {movie?.vote_count?.toLocaleString()})
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-gray-400" />
                <span>{convertMinutesToHours(movie?.runtime)}</span>
              </div>
              <div className="text-gray-400">
                {movie?.adult ? "R-rated" : "PG"}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button className="px-6 py-2 bg-primary rounded-full flex items-center gap-2 hover:bg-primary/90 transition-all">
                <Play className="h-5 w-5" /> Watch Trailer
              </button>
              <button
                onClick={handleLike}
                className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  isLiked ? "bg-red-500" : "bg-gray-800 hover:bg-gray-700"
                } transition-all`}
              >
                <Heart
                  className={`h-5 w-5 ${
                    isLiked ? "fill-white text-white" : "text-gray-400"
                  }`}
                />
              </button>
              <button
                onClick={handleWatchlist}
                className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  isInWatchlist
                    ? "bg-blue-500"
                    : "bg-gray-800 hover:bg-gray-700"
                } transition-all`}
              >
                <Bookmark
                  className={`h-5 w-5 ${
                    isInWatchlist ? "fill-white text-white" : "text-gray-400"
                  }`}
                />
              </button>
              <button className="h-10 w-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-all">
                <Share2 className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            {/* Overview */}
            <div className="space-y-3">
              <h2 className="text-xl font-semibold">Overview</h2>
              <p className="text-gray-300">{movie?.overview}</p>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {movie?.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Sections */}
        <div className="mt-12 space-y-8">
          {/* Cast Section */}
          {movie?.credits?.cast?.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Cast</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {movie.credits.cast.slice(0, 6).map((person) => (
                  <div key={person.id} className="space-y-2 text-center">
                    <div className="aspect-square rounded-full bg-gray-800 mx-auto overflow-hidden">
                      {person.profile_path && (
                        <img
                          src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                          alt={person.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <h3 className="font-medium">{person.name}</h3>
                    <p className="text-sm text-gray-400">{person.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Similar Movies */}
          {movie?.similar?.results?.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Similar Movies</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {movie.similar.results.slice(0, 5).map((similarMovie) => (
                  <div key={similarMovie.id} className="space-y-2">
                    <div className="aspect-[2/3] rounded-lg bg-gray-800 overflow-hidden">
                      {similarMovie.poster_path && (
                        <img
                          src={`https://image.tmdb.org/t/p/w300${similarMovie.poster_path}`}
                          alt={similarMovie.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <NavLink to={`/movie/${similarMovie.id}`}>
                      <h3 className="font-medium truncate hover:text-red-600 transition-colors">
                        {similarMovie.title}
                      </h3>
                    </NavLink>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                      <span className="text-xs">
                        {similarMovie.vote_average?.toFixed(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};