import MovieCarousel from './moviecoursel';
import CustomLoader from './cusloader';

function Home() {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  if (!API_KEY) {
    return (
      <div className="min-h-screen bg-light-gray flex items-center justify-center">
        <p className="text-red-500 text-center">Error: TMDB API key is not defined in the .env file.</p>
      </div>
    );
  }

  return <MovieCarousel apiKey={API_KEY} />;
}

export default Home;