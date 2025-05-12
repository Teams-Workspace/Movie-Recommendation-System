import MovieCarousel from './moviecoursel';
import HeroGrid from './HeroGrid';

function Home() {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  if (!API_KEY) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-red-500 text-center">Error: TMDB API key is not defined in the .env file.</p>
      </div>
    );
  }

  return (
    <div className="bg-black overflow-x-hidden">
      {/* First Section: Full-Screen Carousel */}
      <div className="relative h-screen w-full">
        <MovieCarousel apiKey={API_KEY} />
      </div>

      {/* Second Section: Full-Screen Hero Grid */}
      <div className="relative h-screen w-full">
        <HeroGrid apiKey={API_KEY} />
      </div>
    </div>
  );
}

export default Home;