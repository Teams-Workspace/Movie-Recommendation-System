import MovieCarousel from "./moviecoursel";
import HeroGrid from "./HeroGrid";
import HorizontalScroll from "./HorizontalScroll";
import FeaturedSpotlight from "./FeaturedSpotlight";

function Home() {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  if (!API_KEY) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-red-500 text-center">
          Error: TMDB API key is not defined in the .env file.
        </p>
      </div>
    );
  }

  return (
    <main cla="min-h-screen bg-black text-white">
    
      {/* First Section: Full-Screen Carousel */}

      <div className="relative h-screen w-full">
        <MovieCarousel apiKey={API_KEY} />
      </div>

      {/* Full Screen Coursel End */}

      {/* Second Section: Full-Screen Hero Grid */}

      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Featured Movies</h2>
          <HeroGrid apiKey={API_KEY} />
        </div>
      </section>

      {/* Second Section End */}

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
    
    </main>
  );
}

export default Home;
