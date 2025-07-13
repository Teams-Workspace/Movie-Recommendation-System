import { LuBookmark } from "react-icons/lu";

export const MovieGrid = ({ movies, isRemoving, onRemove }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <div key={movie.id} className="bg-gray-950 rounded-lg overflow-hidden">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-64 object-cover"
            loading="lazy"
          />
          <div className="p-4">
            <h3 className="text-lg font-bold text-white">{movie.title}</h3>
            <button
              className="mt-2 flex items-center gap-2 px-3 py-1 bg-red-600 text-white rounded-md"
              onClick={() => onRemove(movie.id)}
              disabled={isRemoving[movie.id]}
            >
              {isRemoving[movie.id] ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <LuBookmark className="w-4 h-4" />
              )}
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};