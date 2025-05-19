import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MovieCard from './MovieCard';
import SearchNotFound from './SearchNotFound';
import SiteFooter from '../SiteFooter';
import axios from 'axios';

// Grid Layout
function GridLayout({ movies, searchQuery }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movies.map((movie, index) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isHovered={hoveredIndex === index}
          onHover={() => setHoveredIndex(index)}
          onLeave={() => setHoveredIndex(null)}
          searchQuery={searchQuery}
        />
      ))}
    </div>
  );
}

export default function SearchPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    if (!query) {
      setMovies([]);
      setIsLoading(false);
      return;
    }

    const source = axios.CancelToken.source();
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
          params: {
            api_key: apiKey,
            query,
            language: 'en-US',
          },
          cancelToken: source.token,
        });

        // Map TMDB response to Movie type
        const mappedMovies = response.data.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          posterUrl: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder.svg',
          backdropUrl: movie.backdrop_path
            ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
            : '/placeholder.svg',
          year: movie.release_date ? movie.release_date.split('-')[0] : 'N/A',
          duration: 'N/A', // TMDB doesn't provide duration; could fetch from /movie/{id}
          genre: movie.genre_ids.map((id) => {
            // Simplified genre mapping (full list should be in a constants file)
            const genres = {
              28: 'Action',
              35: 'Comedy',
              18: 'Drama',
              878: 'Sci-Fi',
            };
            return genres[id] || 'Other';
          }),
          description: movie.overview || 'No description available.',
          rating: movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A',
        }));

        setMovies(mappedMovies);
      } catch (err) {
        if (axios.isCancel(err)) return;
        console.error(err);
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(fetchMovies, 300);
    return () => {
      clearTimeout(debounce);
      source.cancel('Request cancelled');
    };
  }, [query, apiKey]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 mt-8 ">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
        </div>
      </div>
    );
  }

  if (movies.length === 0 && query) {
    return <SearchNotFound query={query} />;
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
    <div className="container mx-auto px-4 py-16 mt-8 ">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white-custom">Search Results</h1>
          <p className="text-gray-400 mt-1">
            Found {movies.length} results for "{query}"
          </p>
        </div>

       
      </div>

      <GridLayout movies={movies} searchQuery={query} />
      
    </div>
    <div className="relative w-full">
        <SiteFooter />
      </div>
    </main>
  );
}