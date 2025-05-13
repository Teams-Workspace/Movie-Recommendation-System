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
    <main className="min-h-screen bg-black text-white overflow-hidden">
    
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

      <section className="py-8 bg-gradient-to-r from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">New Releases</h2>
        <HorizontalScroll apiKey={API_KEY} />
        </div>
      </section>

      {/* Third Section is end */}


      {/* Fourth Section: Featured Spotlight */}

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Spotlight</h2>
        <FeaturedSpotlight apiKey={API_KEY} />
        </div>
      </section>

      {/* Fourth Section end */}
    </main>
  );
}

export default Home;
