

import MovieCarousel from './moviecoursel';
import HeroGrid from './HeroGrid';
import HorizontalScroll from './HorizontalScroll';
import FeaturedSpotlight from './FeaturedSpotlight';


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
<div className="relative h-screen w-full mt-2">
  {/* "Featured Movies" Header */}
  <div className="absolute -top-11 md:top-0 w-full px-4 md:px-0 md:w-auto md:left-16 z-10 ">
    <h2 className="text-2xl md:text-3xl font-bold text-white text-center md:text-left mt-2">
      Featured Movies
    </h2>
  </div>
  <HeroGrid apiKey={API_KEY} />
</div>

      {/* Third Section: Horizontal Scroll */}
      <div className="relative w-full z-10 -mt-40 md:mt-0 ">
         <div className="mb-6 w-full md:w-auto text-center md:text-left  z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white md:pl-16">
          Popular Movies
        </h2>
      </div>
        <HorizontalScroll apiKey={API_KEY} />
      </div>

      {/* Fourth Section: Featured Spotlight */}
      <div className="relative w-full p-6">
         <div className="mb-6 w-full md:w-auto text-center md:text-left  z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white md:pl-10">
          New Release
        </h2>
      </div>
        <FeaturedSpotlight apiKey={API_KEY} />
      </div>

      
    </div>
  );
}

export default Home;