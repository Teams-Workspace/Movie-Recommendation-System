import { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaBookmark, FaHeart, FaSignOutAlt, FaUser, FaSearch } from 'react-icons/fa';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchInputRef = useRef(null);

  // Dummy movie data for search results
  const dummyMovies = [
    'The Matrix',
    'Inception',
    'The Dark Knight',
    'Interstellar',
    'The Shawshank Redemption',
  ];

  // Filter movies based on search term
  const filteredMovies = dummyMovies.filter(movie =>
    movie.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isSearchActive]);

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
  };

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
    setSelectedIndex(-1); // Reset selection when typing
  };

  const handleKeyDown = (e) => {
    if (!isSearchActive) return;

    if (e.key === 'Escape') {
      closeSearchOverlay();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < filteredMovies.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      const selectedMovie = filteredMovies[selectedIndex];
      alert(`Selected movie: ${selectedMovie}`); // Replace with actual navigation or action
      closeSearchOverlay();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isSearchActive, selectedIndex, filteredMovies]);

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
        className={`fixed z-50 px-4 transition-all duration-700 left-1/2 transform -translate-x-1/2 ${
          isScrolled
            ? 'top-4 w-[80%] shadow-md bg-dark/80 backdrop-blur-md rounded-full border-2 border-white-custom'
            : 'top-0 w-full bg-transparent'
        }`}
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
                <button onClick={handleLogout} className="cursor-pointer border-2 border-dark rounded-full p-1">
                  <FaSignOutAlt className="text-red-main hover:scale-110 transition-transform" size={16} />
                </button>
              </>
            ) : (
              <Link to="/login" className="border-2 border-dark rounded-full p-1">
                <FaUser className="text-red-main hover:scale-110 transition-transform" size={16} />
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

            {/* Search Instructions */}
            <div className="text-xs text-gray-500 mb-2">
              Use ↑/↓ to navigate, Enter to select, Esc to close
            </div>

            {/* Search Results */}
            {filteredMovies.length > 0 ? (
              <ul className="max-h-48 overflow-y-auto">
                {filteredMovies.map((movie, index) => (
                  <li
                    key={index}
                    className={`p-2 rounded-md cursor-pointer transition-all ${
                      index === selectedIndex
                        ? 'bg-red-main text-white'
                        : 'hover:bg-gray-100 text-dark'
                    }`}
                    onClick={() => {
                      alert(`Selected movie: ${movie}`); // Replace with actual action
                      closeSearchOverlay();
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    {highlightSearchTerm(movie, searchTerm)}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-dark text-sm">
                No movies found for "{searchTerm}"
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;