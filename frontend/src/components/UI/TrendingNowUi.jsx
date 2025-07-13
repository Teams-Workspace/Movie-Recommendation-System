import { useState, useEffect } from "react";
import { FaStarHalfAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import { LuCircleArrowLeft, LuCircleArrowRight } from "react-icons/lu";

export const MovieCard = ({ movie, movies = [], navigate }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate rank if multiple movies provided
  const rank = movies.length > 1
    ? [...movies].sort((a, b) => b.vote_average - a.vote_average).findIndex((m) => m.id === movie.id) + 1
    : null;


  return (
    <div
      className="group relative rounded-lg overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[2/3]">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path}`}
          alt={movie.title}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
            isHovered ? 'scale-110 brightness-75' : 'brightness-90'
          }`}
          loading="lazy"
        />

        <div className="absolute top-2 left-2 flex items-center space-x-1 bg-black/60 rounded px-1.5 py-0.5">
          <FaStarHalfAlt className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium text-white">
            {movie.vote_average?.toFixed(1) || 'N/A'}
          </span>
        </div>

        {rank && (
          <div className={`absolute top-0 right-0 w-8 h-8 bg-red-600 flex items-center justify-center font-bold text-sm text-white transition-transform duration-300 ${
            isHovered ? 'scale-110' : ''
          }`}>
            #{rank}
          </div>
        )}

        <div className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3`}>
          <h3 className="text-sm font-bold line-clamp-1 text-white">{movie.title}</h3>
        </div>

        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button
            className="cursor-pointer bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm flex items-center justify-center gap-1 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100"
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            Explore More
          </button>
        </div>
      </div>

      <div className="mt-2 px-1">
        <h3 className="text-sm font-medium line-clamp-1 text-white">{movie.title}</h3>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-gray-400">
            {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
};



export const MovieCarousel = ({ movies, title = "Trending Now", visibleSlides = 4, autoRotate = true }) => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();
  
  const totalSlides = Math.ceil(movies.length / visibleSlides);

  useEffect(() => {
    if (!autoRotate || movies.length <= visibleSlides) return;
    
    const interval = setInterval(() => {
      next();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [current, isAnimating, movies.length]);

  const next = () => {
    if (isAnimating || movies.length <= visibleSlides) return;
    setIsAnimating(true);
    setCurrent(prev => (prev === totalSlides - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prev = () => {
    if (isAnimating || movies.length <= visibleSlides) return;
    setIsAnimating(true);
    setCurrent(prev => (prev === 0 ? totalSlides - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
        
        {movies.length > visibleSlides && (
          <div className="flex space-x-2">
            <button
              className="h-8 w-8 rounded-full border border-gray-700 bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center"
              onClick={prev}
              disabled={isAnimating}
            >
              <LuCircleArrowLeft className="h-4 w-4" />
            </button>
            <button
              className="h-8 w-8 rounded-full border border-gray-700 bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center"
              onClick={next}
              disabled={isAnimating}
            >
              <LuCircleArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div
              key={slideIndex}
              className="flex-shrink-0 w-full grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {movies
                .slice(slideIndex * visibleSlides, (slideIndex + 1) * visibleSlides)
                .map(movie => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    movies={movies}
                    navigate={navigate}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};