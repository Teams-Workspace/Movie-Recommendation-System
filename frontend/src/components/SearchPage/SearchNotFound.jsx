import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import SiteFooter from "../SiteFooter";

function SearchNotFound({ query }) {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <div className="container mx-auto px-4 py-16 mt-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="relative h-40 w-40 mx-auto mb-6 opacity-60">
            <div className="absolute inset-0 flex items-center justify-center ">
              <FaSearch className="h-20 w-20  text-red-main  " size={14} />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white-custom mb-4">
            No results found for "{query}"
          </h1>
          <p className="text-gray-400 mb-8">
            We couldn't find what you're looking for. Try searching with
            different keywords or browse our categories.
          </p>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-white-custom mb-4">
              Popular Categories
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                "Action",
                "Comedy",
                "Drama",
                "Sci-Fi",
                "Horror",
                "Romance",
                "Animation",
                "Thriller",
              ].map((genre) => (
                <Link
                  key={genre}
                  to={`/search?q=${encodeURIComponent(genre)}`}
                  className="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 text-center transition-colors text-white-custom"
                >
                  <h3 className="font-medium">{genre}</h3>
                </Link>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-white-custom mb-4">
              Try These Searches
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "Marvel",
                "2023 Movies",
                "Oscar Winners",
                "Tom Cruise",
                "Sci-Fi",
                "Christopher Nolan",
                "Animated",
                "Thriller",
              ].map((term) => (
                <Link
                  key={term}
                  to={`/search?q=${encodeURIComponent(term)}`}
                  className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-full text-sm text-white-custom"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full">
        <SiteFooter />
      </div>
    </main>
  );
}

export default SearchNotFound;
