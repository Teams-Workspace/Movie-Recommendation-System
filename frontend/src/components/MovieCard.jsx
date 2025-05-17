import { FaRegCirclePlay } from "react-icons/fa6";
import { TiStarFullOutline } from "react-icons/ti";

function MovieCard({ movie, isHovered, onHover, onLeave, searchQuery }) {
  return (
    <a
      href={`/movie/${movie.id}${
        searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ""
      }`}
      className="relative rounded-lg overflow-hidden group"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="relative aspect-[2/3]">
        <img
          src={movie.posterUrl || "/placeholder.svg"}
          alt={movie.title}
          className={`object-cover w-full h-full transition-all duration-300 ${
            isHovered ? "scale-110 brightness-75" : "brightness-100"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        <div className="absolute bottom-0 left-0 p-3 w-full">
          <h3 className="text-sm font-bold text-white-custom">{movie.title}</h3>
          <div className="flex items-center space-x-2 mt-1">
            <div className="flex items-center text-yellow-400">
              <TiStarFullOutline className="w-3 h-3 fill-yellow-400 mr-1" />
              <span className="text-xs">{movie.rating}</span>
            </div>
            <span className="text-xs text-gray-300">{movie.year}</span>
          </div>
        </div>

        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <button className="flex items-center px-4 py-2 rounded-full bg-[#e50914] text-white text-sm font-medium hover:bg-[#c40812] transition">
              <FaRegCirclePlay className="w-4 h-4 mr-2 fill-current" />
              Watch
            </button>
          </div>
        )}
      </div>
    </a>
  );
}

export default MovieCard;
