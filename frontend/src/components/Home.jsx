import MovieCarousel from "./moviecoursel";
import HeroGrid from "./HeroGrid";
import HorizontalScroll from "./HorizontalScroll";
import FeaturedSpotlight from "./FeaturedSpotlight";
import MasonryLayout from "./MasonryLayout";
import TrendingCarousel from "./TrendingCarousel";
import TopRatedSection from "./TopRatedSection";
import ComingSoonTimeline from "./ComingSoonTimeline";
import InteractivePosterGallery from "./InteractivePosterGallery";
import SiteFooter from "./SiteFooter";

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

      {/* Fifth Section start */}

      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Popular This Week</h2>
          <MasonryLayout apiKey={API_KEY} />
        </div>
      </section>

      {/* Fifth Section End */}


      {/* Sixth Section start */}
      <section className="py-8 bg-gradient-to-r from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Trending Now</h2>
          <TrendingCarousel apiKey={API_KEY}/>
        </div>
      </section>

      {/* Sixth section end */}

      {/* Seventh Section Start */}

      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Top Rated</h2>
          <TopRatedSection apiKey={API_KEY} />
        </div>
      </section>

      {/* Seventh Section End */}

      {/* Eighth Section Start */}

      <section className="py-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Coming Soon</h2>
          <ComingSoonTimeline apiKey={API_KEY}  />
        </div>
      </section>

      {/* Eighth Section End */}

      {/* Ninth Section Start */}

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Featured Collection</h2>
          <InteractivePosterGallery apiKey={API_KEY}  />
        </div>
      </section>

      {/* Ninth Section End */}

      {/* Final Section: Site Footer */}
      <div className="relative w-full">
        <SiteFooter />
      </div>


      

    </main>
  );
}

export default Home;
