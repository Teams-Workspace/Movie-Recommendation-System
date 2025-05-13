import { useState, useEffect } from 'react';
import CustomLoader from './cusloader';
import { ChevronLeft, ChevronRight } from "lucide-react"

function TrendingCarousel({ apiKey }) {
  const [movies, setMovies] = useState([]);
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const visibleSlides = 4;
  const maxSlides = 20; // Fetch 20 movies
  const totalSlides = Math.ceil(maxSlides / visibleSlides);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=6`;
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const sortedMovies = data.results
          .slice(0, 20) // Limit to 20 movies
          .sort((a, b) => b.vote_average - a.vote_average); // Sort by rating descending
        setMovies(sortedMovies);
      } catch (err) {
        console.error('Error fetching movies:', err);
      }
      finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, [apiKey]);

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(interval);
  }, [current, isAnimating]); // Re-run interval when current or isAnimating changes

  const next = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  if (isLoading) return <CustomLoader />;

  if (!movies || movies.length < maxSlides) return null;

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-1 bg-red-600 rounded-full"></div>
          <span className="text-sm font-medium text-red-600">TRENDING</span>
        </div>

        <div className="flex space-x-2">
          <button
             variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full border-gray-700 bg-gray-800 hover:bg-gray-700"
            onClick={prev}
            disabled={isAnimating}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span className="sr-only">Previous</span>
          </button>
          <button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full border-gray-700 bg-gray-800 hover:bg-gray-700"
            onClick={next}
            disabled={isAnimating}
          >
           <ChevronRight className="h-4 w-4 ml-1" />
            <span className="sr-only">Next</span>
          </button>
        </div>
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
                .map((movie) => (
                  <TrendingCard key={movie.id} movie={movie} movies={movies} />
                ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === current ? 'bg-red-600 w-6' : 'bg-gray-600'
            }`}
            onClick={() => {
              if (isAnimating) return;
              setIsAnimating(true);
              setCurrent(index);
              setTimeout(() => setIsAnimating(false), 500);
            }}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function TrendingCard({ movie, movies }) {
  const [isHovered, setIsHovered] = useState(false);

  // Assign rank based on sorted rating order
  const sortedMovies = [...movies].sort((a, b) => b.vote_average - a.vote_average);
  const rank = sortedMovies.findIndex((m) => m.id === movie.id) + 1;

  return (
    <div
      className="group relative rounded-lg overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[2/3]">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
            isHovered ? 'scale-110 brightness-75' : ''
          }`}
        />

        <div className="absolute top-2 left-2 flex items-center space-x-1 bg-black/60 rounded px-1.5 py-0.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-3 h-3 text-yellow-400"
          >
            <path d="M12 .587l3.668 7.431 8.332 1.151-6.001 5.852 1.417 8.257L12 18.893l-7.416 3.385 1.417-8.257-6.001-5.852 8.332-1.151z" />
          </svg>
          <span className="text-xs font-medium">{movie.vote_average.toFixed(1)}</span>
        </div>

        <div
          className={`absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3`}
        >
          <h3 className="text-sm font-bold line-clamp-1">{movie.title}</h3>
          <p className="text-xs text-gray-300 mt-1">Action, Drama</p> {/* Placeholder genres */}

          <button
            className=" mt-2 w-full bg-red-600/90 hover:bg-red-600 text-white px-3 py-1 rounded text-sm flex items-center justify-center gap-1"
          >
            Explore More
          </button>
        </div>

        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
            
          </div>
        </div>
      </div>

      <div className="mt-2 px-1">
        <h3 className="text-sm font-medium line-clamp-1">{movie.title}</h3>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-gray-400">{new Date(movie.release_date).getFullYear() || 'N/A'}</span>
          <span className="text-xs text-gray-400">N/A</span> {/* Placeholder for duration */}
        </div>
      </div>

      {/* Rank number based on rating */}
      <div
        className={`absolute top-0 right-0 w-8 h-8 bg-red-600 flex items-center justify-center font-bold text-sm transition-transform duration-300 ${
          isHovered ? 'scale-110' : ''
        }`}
      >
        #{rank}
      </div>
    </div>
  );
}

export default TrendingCarousel;