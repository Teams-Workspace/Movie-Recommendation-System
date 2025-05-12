import MovieCarousel from './moviecoursel';
import HeroGrid from './HeroGrid';
import HorizontalScroll from './HorizontalScroll';

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
        {/* "Featured Movies" Header */}
        <h2 className="absolute top-4 left-20 text-3xl md:text-4xl font-bold  text-white z-10">
          Featured Movies
        </h2>
        <HeroGrid apiKey={API_KEY} />
      </div>

      {/* Third Section: Horizontal Scroll */}
      <div className="relative h-screen w-full ">
        {/* "Featured Movies" Header */}
        <h2 className="absolute top-4 left-20 text-3xl md:text-4xl font-bold  text-white z-10">
          Action Movies
        </h2>
        <HorizontalScroll apiKey={API_KEY} />
      </div>

    </div>
  );
}

export default Home;