import { useState, useEffect, useRef} from "react";
import { FiSearch } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./Spinner";
import { searchData } from "../../api/apicalls";
import { useNavigate } from "react-router-dom";

// Custom debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const fetchMovies = async (query) => {
  if (!query) return [];
  try {
    const res = await searchData(query);
    return res.data.results || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export const SearchModal = ({ isOpen, onClose }) => {

  const navigate = useNavigate();


  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const resultsRef = useRef(null);

  const handleMovieSelect = (movieId) => {
    navigate(`/movie/${movieId}`);
    onClose();
  };

  // Using custom debounce hook
  const debouncedQuery = useDebounce(searchQuery, 600);

  // React Query for data fetching
  const {
    data: searchResults = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["searchMovies", debouncedQuery],
    queryFn: () => fetchMovies(debouncedQuery),
    enabled: !!debouncedQuery, // Only run query when debouncedQuery is not empty
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
      }

      // Handle arrow key navigation
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
      } else if (e.key === "Enter" && selectedIndex >= 0) {
        e.preventDefault();
        const selectedItem = searchResults[selectedIndex];
        handleMovieSelect(selectedItem.id);
        // Here you would typically:
        // 1. Navigate to the selected item's page
        // 2. Or perform some action with the selected item
        // 3. Then close the modal
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, searchResults, selectedIndex]);

  // Scroll into view when selected index changes
  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const selectedElement = resultsRef.current.children[selectedIndex];
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh]"
        onClick={onClose}
      >
        {/* Grid Overlay Background */}
        <div
          className="absolute inset-0 bg-transparent backdrop-blur-sm"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-[#1a1d23] border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
            {/* Search Input */}
            <div className="flex items-center px-4 py-3 border-b border-gray-700">
              <FiSearch className="text-gray-400 mr-3" size={20} />
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-lg"
                autoFocus
              />
              <div className="flex items-center gap-2">
                {!isLoading && (
                  <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs font-medium text-gray-400 bg-gray-800 border border-gray-600 rounded">
                    ESC
                  </kbd>
                )}
                {isLoading ? (
                  <Spinner size="sm" />
                ) : (
                  <button
                    onClick={onClose}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                  >
                    <MdClose size={20} />
                  </button>
                )}
              </div>
            </div>

            {/* Search Results */}
            <div className="max-h-96 overflow-y-auto scrollbar-hide" ref={resultsRef}>
              {isLoading ? (
                <div className="p-8 text-center">
                  <Spinner />
                </div>
              ) : isError ? (
                <div className="p-8 text-center">
                  <div className="text-gray-400 mb-2">Error fetching results</div>
                  <div className="text-gray-500 text-sm">Please try again later</div>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="p-2">
                  {searchResults.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`flex items-center justify-between p-3 rounded-lg hover:bg-gray-800 cursor-pointer transition-colors group ${
                        selectedIndex === index ? "bg-gray-800" : ""
                      }`}
                       onMouseEnter={() => setSelectedIndex(index)}
                      onClick={() => handleMovieSelect(item.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center overflow-hidden">
                          {item.poster_path ? (
                            <img
                              src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-white font-bold text-sm">
                              {item.title.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div>
                          <h3 className="text-white font-medium group-hover:text-red-400 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            Movie • {item.release_date?.split("-")[0] || 'Unknown year'}
                          </p>
                        </div>
                      </div>
                      <div className="text-gray-500 group-hover:text-gray-300 transition-colors">
                        <FiSearch size={16} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : searchQuery ? (
                <div className="p-8 text-center">
                  <div className="text-gray-400 mb-2">No results found</div>
                  <div className="text-gray-500 text-sm">
                    Try searching for a different movie
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <div className="text-gray-400 mb-2">Search for movies</div>
                  <div className="text-gray-500 text-sm">
                    Start typing to see results
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-700 px-4 py-3 bg-gray-900/50">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-gray-800 border border-gray-600 rounded text-xs">
                      ↵
                    </kbd>
                    <span>to select</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-gray-800 border border-gray-600 rounded text-xs">
                      ↑↓
                    </kbd>
                    <span>to navigate</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-gray-800 border border-gray-600 rounded text-xs">
                    ESC
                  </kbd>
                  <span>to close</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};