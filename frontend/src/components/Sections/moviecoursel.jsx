import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomLoader from '../cusloader';

function MovieCarousel({ apiKey }) {
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right, 0 for initial
  const intervalRef = useRef(null);
  const duration = 6000; // 6 seconds per slide

  const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setMovieData(data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [apiKey]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((current) => (current === (movieData.length - 1) ? 0 : current + 1));
  }, [movieData.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((current) => (current === 0 ? movieData.length - 1 : current - 1));
  }, [movieData.length]);

  const goToSlide = useCallback((index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, duration);

    return () => {
      clearInterval(interval);
    };
  }, [next, duration]);

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-red-500 text-center">Error fetching movies: {error}</p>
      </div>
    );
  }

  if (loading) {
    return <CustomLoader />;
  }

  if (!movieData.length) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-gray-400 text-center">No movies available.</p>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {movieData.map((slide, index) => (
        <div
          key={`bg-${slide.id}`}
          className={`absolute inset-0 transition-all duration-1500 ease-out ${
            index === current
              ? "opacity-100 z-10"
              : direction > 0
                ? "opacity-0 z-0 translate-x-1/4"
                : "opacity-0 z-0 -translate-x-1/4"
          }`}
        >
          <div
            className="absolute inset-0 transition-transform duration-2000 ease-out"
            style={{
              transform: index === current ? "scale(1.05)" : "scale(1)",
              backgroundImage: `url(https://image.tmdb.org/t/p/w1920${slide.backdrop_path})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/50" />
          </div>
        </div>
      ))}

      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 text-white-custom space-y-6 mb-8 md:mb-0">
            {movieData.map((slide, index) => (
              <div
                key={`content-${slide.id}`}
                className={`transition-all duration-1000 ease-out ${
                  index === current ? "opacity-100 translate-y-0" : "absolute opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: index === current ? "300ms" : "0ms",
                }}
              >
                <h2 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h2>
                <p className="text-xl md:text-2xl text-white-custom/80 mb-8 max-w-xl">{slide.overview}</p>
                <button
                  className="cursor-pointer bg-red-main text-white-custom px-6 py-2 rounded-md hover:bg-red-main/90"
                  onClick={() => navigate(`/movie/${slide.id}`)}
                >
                  Explore Movie
                </button>
              </div>
            ))}
          </div>

          <div className="w-full md:w-1/2 flex justify-center md:justify-end relative h-[300px] md:h-[500px]">
            {movieData.map((slide, index) => (
              <div
                key={`poster-${slide.id}`}
                className={`absolute transition-all duration-1200 ease-out ${
                  index === current
                    ? "opacity-100 z-10 scale-100"
                    : direction > 0
                      ? "opacity-0 z-0 translate-x-full scale-90"
                      : "opacity-0 z-0 -translate-x-full scale-90"
                }`}
                style={{
                  transitionDelay: index === current ? "200ms" : "0ms",
                }}
              >
                <div
                  className="relative w-[200px] md:w-[300px] h-[300px] md:h-[450px] shadow-2xl rounded-lg overflow-hidden transition-transform duration-1500"
                  style={{
                    transform: index === current ? "translateY(0)" : "translateY(50px)",
                  }}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${slide.poster_path}`}
                    alt={slide.title}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-30 px-8 md:px-16">
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            <button
              className="cursor-pointer h-10 w-10 rounded-full bg-black/20 text-white-custom backdrop-blur-sm hover:bg-black/30 border border-white-custom/20"
              onClick={prev}
            >
              ←
            </button>
            <button
              className="cursor-pointer h-10 w-10 rounded-full bg-black/20 text-white-custom backdrop-blur-sm hover:bg-black/30 border border-white-custom/20"
              onClick={next}
            >
              →
            </button>
          </div>

          <div className="text-white-custom text-sm font-medium">
            {current + 1}/{movieData.length}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCarousel;