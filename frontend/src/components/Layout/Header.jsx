import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaBookmark,
  FaHeart,
  FaSignOutAlt,
  FaUserCircle,
  FaSearch,
} from "react-icons/fa";
import { SearchModal} from '../UI/SearchModal';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
   const [isSearchOpen, setIsSearchOpen] = useState(false)

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };



useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setIsSearchOpen(true);
    }
  };

  window.addEventListener("scroll", handleScroll);
  document.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("scroll", handleScroll);
    document.removeEventListener("keydown", handleKeyDown);
  };
}, []);

  return (
    <>
      <nav
        className={`
          fixed z-50 px-4 transition-all duration-700 w-full
          md:left-1/2 md:transform md:-translate-x-1/2
          ${
            isScrolled
              ? "md:top-4 md:w-[80%] md:shadow-xl md:bg-[#0f1419]/90 md:backdrop-blur-xl md:rounded-full md:border md:border-gray-700/50"
              : "md:top-0 md:w-full md:bg-transparent"
          }
          bg-[#0f1419]/90 backdrop-blur-xl top-0 border-b border-gray-800/50
        `}
      >
        
        <div className="w-full flex items-center justify-between py-3">

          {/* Logo  */}
          <div className="flex items-center gap-4">
            <NavLink to="/">
              <img
                src="/Logo.png"
                alt="MRS-LOGO"
                className="h-10"
              />
            </NavLink>
          </div>

          <div className="flex items-center gap-3">
            {/* Enhanced Search Bar */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="group relative flex items-center gap-3 bg-[#1a1d23] hover:bg-[#1f2329] border border-gray-700 hover:border-gray-600 rounded-full px-4 py-2.5 transition-all duration-200 min-w-[200px] md:min-w-[280px]"
            >
              <FaSearch className="text-gray-400 group-hover:text-gray-300" size={16} />
              <span className="text-gray-400 group-hover:text-gray-300 text-sm flex-1 text-left">
                Search movies, shows...
              </span>
              <div className="hidden sm:flex items-center gap-1 text-xs text-gray-500">
                <kbd className="px-1.5 py-0.5 bg-gray-800 border border-gray-600 rounded text-xs font-mono">⌘</kbd>
                <kbd className="px-1.5 py-0.5 bg-gray-800 border border-gray-600 rounded text-xs font-mono">K</kbd>
              </div>
            </button>

            {user ? (
              <div className="flex items-center gap-2">
                <NavLink
                  to="/wishlist"
                  className="p-2.5 bg-[#1a1d23] hover:bg-[#1f2329] border border-gray-700 hover:border-red-500/50 rounded-full transition-all duration-200 group"
                >
                  <FaBookmark className="text-gray-400 group-hover:text-red-400 transition-colors" size={16} />
                </NavLink>
                <NavLink
                  to="/likes"
                  className="p-2.5 bg-[#1a1d23] hover:bg-[#1f2329] border border-gray-700 hover:border-red-500/50 rounded-full transition-all duration-200 group"
                >
                  <FaHeart className="text-gray-400 group-hover:text-red-400 transition-colors" size={16} />
                </NavLink>
                <NavLink
                  to="/profile"
                  className="p-2.5 bg-[#1a1d23] hover:bg-[#1f2329] border border-gray-700 hover:border-red-500/50 rounded-full transition-all duration-200 group"
                >
                  <FaUserCircle className="text-gray-400 group-hover:text-red-400 transition-colors" size={16} />
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="p-2.5 bg-[#1a1d23] hover:bg-red-600/20 border border-gray-700 hover:border-red-500/50 rounded-full transition-all duration-200 group"
                >
                  <FaSignOutAlt className="text-gray-400 group-hover:text-red-400 transition-colors" size={16} />
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="p-2.5 bg-[#1a1d23] hover:bg-[#1f2329] border border-gray-700 hover:border-red-500/50 rounded-full transition-all duration-200 group"
              >
                <FaUserCircle className="text-gray-400 group-hover:text-red-400 transition-colors" size={16} />
              </NavLink>
            )}
          </div>
        </div>
      </nav>

      {/* Search Model */}
      
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

    </>
  );
};
