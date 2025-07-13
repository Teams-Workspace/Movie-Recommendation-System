// components/MovieCard.jsx
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { LuCircleArrowLeft, LuCircleArrowRight } from "react-icons/lu";
import { useNavigate } from "react-router-dom";


export const MovieCard = ({ movie, isLiked, isLiking, onToggleLike }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="flex-shrink-0 w-[180px] relative group/item"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-[270px] rounded-lg overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={`object-cover w-full h-full transition-all duration-500 ${
            isHovered ? "scale-110 brightness-110" : ""
          }`}
          loading="lazy"
        />

        <div
          className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            className="cursor-pointer transform translate-y-4 opacity-0 group-hover/item:translate-y-0 group-hover/item:opacity-100 transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation();
              onToggleLike(movie.id);
            }}
            disabled={isLiking}
            aria-label={isLiked ? "Unlike" : "Like"}
          >
            {isLiking ? (
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : isLiked ? (
              <FaHeart className="w-8 h-8 fill-red-600" />
            ) : (
              <FaRegHeart className="w-8 h-8 fill-white" />
            )}
          </button>
        </div>
      </div>

      <div className="mt-2">
        <div className="flex items-center space-x-2 mb-1">
          <div className="flex items-center text-yellow-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-3 h-3 text-yellow-400 mr-1"
            >
              <path d="M12 .587l3.668 7.431 8.332 1.151-6.001 5.852 1.417 8.257L12 18.893l-7.416 3.385 1.417-8.257-6.001-5.852 8.332-1.151z" />
            </svg>
            <span className="text-xs">
              {movie.vote_average?.toFixed(1) || "N/A"}
            </span>
          </div>
          <span className="text-xs text-gray-400">
            {movie.release_date
              ? new Date(movie.release_date).getFullYear()
              : "N/A"}
          </span>
        </div>
        <button
          className="text-sm font-medium line-clamp-1 cursor-pointer text-white hover:text-red-500 text-left w-full"
          onClick={() => navigate(`/movie/${movie.id}`)}
        >
          {movie.title}
        </button>
        <p className="text-xs text-gray-400 mt-1">
          {movie.genre_ids?.length > 0 ? "Action, Drama" : "N/A"}
        </p>
      </div>
    </div>
  );
};


export const ArrowButton = ({ direction, onClick }) => (
  <button
    className={`cursor-pointer absolute ${direction}-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 border-none rounded-full w-10 h-10 ${
      direction === "left" ? "-ml-5" : "-mr-5"
    } opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center`}
    onClick={onClick}
  >
    {direction === "left" ? (
      <LuCircleArrowLeft className="h-6 w-6 text-white" />
    ) : (
      <LuCircleArrowRight className="h-6 w-6 text-white" />
    )}
    <span className="sr-only">Scroll {direction}</span>
  </button>
);
