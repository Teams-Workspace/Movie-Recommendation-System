import { useState } from "react";
import { LuBookmarkPlus, LuBookmark } from "react-icons/lu";
import { FaStarHalfAlt, FaStar, FaRegStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const TopRatedUi = ({ movie, isInWatchlist, isAdding, handleToggleWatchlist }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating / 2);
    const hasHalfStar = rating % 2 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
    }

    return stars;
  };

  return (
    <div
      className="bg-gray-950 rounded-lg overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          alt={movie.title}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
            isHovered ? 'scale-110' : ''
          }`}
          loading="lazy"
        />

        <div className="absolute -bottom-5 left-4 h-10 w-10 rounded-full bg-gray-950 border-2 border-red-main flex items-center justify-center">
          <div className="text-sm font-bold text-white">{movie.vote_average.toFixed(1)}</div>
        </div>

        <div
          className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            className="cursor-pointer transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation();
              handleToggleWatchlist(movie.id);
            }}
            disabled={isAdding}
            aria-label={isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
          >
            {isAdding ? (
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : isInWatchlist ? (
              <LuBookmark className="w-8 h-8 fill-green-600" />
            ) : (
              <LuBookmarkPlus className="w-8 h-8 text-white" />
            )}
          </button>
        </div>
      </div>

      <div className="p-4 pt-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg mb-1 text-white">{movie.title}</h3>
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

          <div className="flex">{renderStars(movie.vote_average)}</div>
        </div>

        <p className="text-sm text-gray-400 mt-3 line-clamp-2">{movie.overview}</p>

        <div className="mt-4 flex space-x-2">
          <button
            className="cursor-pointer flex-1 bg-red-main hover:bg-red-main/90 text-white px-3 py-1 rounded-md text-sm"
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            Explore More
          </button>
          <button
            className={`cursor-pointer flex-1 flex items-center justify-center gap-2 px-3 py-1 rounded-md text-sm text-white ${
              isInWatchlist ? 'bg-green-600 hover:bg-green-700' : 'border-gray-700 hover:bg-gray-800 border'
            }`}
            onClick={() => handleToggleWatchlist(movie.id)}
            disabled={isAdding}
          >
            {isAdding ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : isInWatchlist ? (
              <>
                <LuBookmark className="w-4 h-4 fill-white" />
                Added
              </>
            ) : (
              <>
                <LuBookmarkPlus className="w-4 h-4" />
                Add to Watchlist
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};