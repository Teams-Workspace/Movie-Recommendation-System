import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaBookmark,
  FaHeart,
  FaSignOutAlt,
  FaSignInAlt,
  FaSearch,
} from 'react-icons/fa';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

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
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeSearchOverlay();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <>
      <nav
  className={`fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[95%] sm:max-w-[90%] md:max-w-[85%] xl:max-w-[80%] z-50 mt-2 px-4 transition-all duration-500 ease-in-out ${
    isScrolled
      ? 'bg-dark/80 backdrop-blur-md rounded-3xl border-2 border-white-custom'
      : 'bg-transparent'
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
      {/* Search input */}
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

      {/* Auth actions */}
      {user ? (
        <>
          <Link to="/watchlist" className="border-2 border-dark rounded-full p-1">
            <FaBookmark className="text-red-main hover:scale-110 transition-transform" size={16} />
          </Link>
          <Link to="/likes" className="border-2 border-dark rounded-full p-1">
            <FaHeart className="text-red-main hover:scale-110 transition-transform" size={16} />
          </Link>
          <button onClick={handleLogout} className="border-2 border-dark rounded-full p-1">
            <FaSignOutAlt className="text-red-main hover:scale-110 transition-transform" size={16} />
          </button>
        </>
      ) : (
        <Link to="/login" className="border-2 border-dark rounded-full p-1">
          <FaSignInAlt className="text-red-main hover:scale-110 transition-transform" size={16} />
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
      className="bg-white-custom rounded-full px-6 py-3 shadow-lg w-4/5 md:w-2/3 lg:w-1/3 flex items-center gap-2 mb-[550px]"
      onClick={(e) => e.stopPropagation()}
    >
      <FaSearch className="text-red-main" size={18} />
      <input
        autoFocus
        type="text"
        placeholder="Search for movies..."
        className="bg-transparent w-full text-dark outline-none text-sm"
      />
    </div>
  </div>
)}

    </>
  );
}

export default Navbar;
