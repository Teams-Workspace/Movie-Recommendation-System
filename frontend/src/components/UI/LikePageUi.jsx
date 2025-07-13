// components/UI/MovieGrid.jsx
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const MovieGrid = ({ movies, isRemoving, onRemove }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <div key={movie.id} className="group relative">
          <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-900">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="object-cover w-full h-full"
              loading="lazy"
              onClick={() => navigate(`/movie/${movie.id}`)}
            />
            
            <button
              className="absolute top-2 right-2 p-2 bg-black/70 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                onRemove(movie.id);
              }}
              disabled={isRemoving[movie.id]}
              aria-label="Remove from likes"
            >
              {isRemoving[movie.id] ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <FaHeart className="w-5 h-5 fill-red-600" />
              )}
            </button>
          </div>
          
          <div className="mt-2">
            <div className="flex items-center space-x-2 mb-1">
              <div className="flex items-center text-yellow-400">
                <span className="text-xs">
                  {movie.vote_average?.toFixed(1) || 'N/A'}
                </span>
              </div>
              <span className="text-xs text-gray-400">
                {movie.release_date?.split('-')[0] || 'N/A'}
              </span>
            </div>
            <h3 
              className="text-sm font-medium line-clamp-1 cursor-pointer hover:text-red-500"
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              {movie.title}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};