import { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaBookmark, FaHeart, FaSignOutAlt, FaUserCircle, FaSearch } from 'react-icons/fa';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [searchResults, setSearchResults] = useState([]);
  const searchInputRef = useRef(null);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  // Fetch movies from TMDB based on search term
  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }

    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchTerm)}&language=en-US`
        );
        if (!response.ok) throw new Error('Failed to fetch movies');
        const data = await response.json();
        setSearchResults(data.results || []);
      } catch (err) {
        console.error(err);
        setSearchResults([]);
      }
    };

    const debounce = setTimeout(fetchMovies, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm, apiKey]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    if (window.innerWidth >= 768) {
      window.addEventListener('scroll', handleScroll);
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearchFocus = () => {
    setIsSearchActive(true);
  };

  const closeSearchOverlay = () => {
    setIsSearchActive(false);
    setSearchTerm('');
    setSelectedIndex(-1);
    setSearchResults([]);
  };

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!isSearchActive) return;

    if (e.key === 'Escape') {
      closeSearchOverlay();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      const selectedMovie = searchResults[selectedIndex];
      navigate(`/movie/${selectedMovie.id}`); // Future: Add movie detail page
      closeSearchOverlay();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isSearchActive, selectedIndex, searchResults]);

  // Highlight search term in red
  const highlightSearchTerm = (text, term) => {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="text-red-main">{part}</span>
      ) : (
        part
      )
    );
  };

  return (
    <>
      <nav
        className={`
          fixed z-50 px-4 transition-all duration-700 w-full
          md:left-1/2 md:transform md:-translate-x-1/2
          ${isScrolled
            ? 'md:top-4 md:w-[80%] md:shadow-md md:bg-dark/80 md:backdrop-blur-md md:rounded-full md:border-2 md:border-white-custom'
            : 'md:top-0 md:w-full md:bg-transparent'}
          bg-dark/80 top-0
        `}
      >
        <div className="w-full flex items-center justify-between py-2">
          <div className="flex items-center gap-4">
            <Link to="/">
              <img
                src="/Logo.png"
                alt="Movie Recommendation System Logo"
                className="h-10"
              />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative font-bold">
              <input
                type="text"
                placeholder="Ctrl + K to search"
                className="border border-light-gray p-1.5 rounded-full w-48 pr-8 bg-white-custom text-dark text-sm"
                onFocus={handleSearchFocus}
              />
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 border-2 border-dark rounded-full p-1"
                onClick={handleSearchFocus}
              >
                <FaSearch
                  className="text-red-main hover:scale-110 transition-transform cursor-pointer"
                  size={14}
                />
              </button>
            </div>

            {user ? (
              <>
                <Link to="/watchlist" className="border-2 border-dark rounded-full p-1">
                  <FaBookmark className="text-red-main hover:scale-110 transition-transform" size={16} />
                </Link>
                <Link to="/likes" className="border-2 border-dark rounded-full p-1">
                  <FaHeart className="text-red-main hover:scale-110 transition-transform" size={16} />
                </Link>
                <Link to="/profile" className="border-2 border-dark rounded-full p-1">
                  <FaUserCircle className="text-red-main hover:scale-110 transition-transform" size={16} />
                </Link>
                <button onClick={handleLogout} className="cursor-pointer border-2 border-dark rounded-full p-1">
                  <FaSignOutAlt className="text-red-main hover:scale-110 transition-transform" size={16} />
                </button>
              </>
            ) : (
              <Link to="/login" className="border-2 border-dark rounded-full p-1">
                <FaUserCircle className="text-red-main hover:scale-110 transition-transform" size={16} />
              </Link>
            )}
          </div>
        </div>
      </nav>

      {isSearchActive && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center"
          onClick={closeSearchOverlay}
        >
          <div
            className="bg-white-custom rounded-lg px-6 py-3 shadow-lg w-4/5 md:w-2/3 lg:w-1/3 flex flex-col gap-2 mb-[450px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <FaSearch className="text-red-main" size={18} />
              <input
                ref={searchInputRef}
                autoFocus
                type="text"
                placeholder="Search for movies..."
                className="bg-transparent w-full text-dark outline-none text-sm"
                value={searchTerm}
                onChange={handleSearchInput}
              />
            </div>

            <div className="text-xs text-gray-500 mb-2">
              Use ↑/↓ to navigate, Enter to select, Esc to close
            </div>

            {searchResults.length > 0 ? (
              <ul className="max-h-48 overflow-y-auto">
                {searchResults.map((movie, index) => (
                  <li
                    key={movie.id}
                    className={`p-2 rounded-md cursor-pointer transition-all ${
                      index === selectedIndex
                        ? 'bg-red-main text-white'
                        : 'hover:bg-gray-100 text-dark'
                    }`}
                    onClick={() => {
                      navigate(`/movie/${movie.id}`); // Future: Add movie detail page
                      closeSearchOverlay();
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    {highlightSearchTerm(movie.title, searchTerm)}
                  </li>
                ))}
              </ul>
            ) : searchTerm ? (
              <div className="text-dark text-sm">
                No movies found for "{searchTerm}"
              </div>
            ) : (
              <div className="text-dark text-sm">
                Start typing to search for movies...
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;