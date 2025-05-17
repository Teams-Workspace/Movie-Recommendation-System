// import { useContext, useState, useEffect, useRef } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaBookmark, FaHeart, FaSignOutAlt, FaUserCircle, FaSearch } from 'react-icons/fa';
// import axios from 'axios';

// function Navbar() {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isSearchActive, setIsSearchActive] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedIndex, setSelectedIndex] = useState(-1);
//   const [searchResults, setSearchResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const searchInputRef = useRef(null);
//   const resultsRef = useRef(null);
//   const apiKey = import.meta.env.VITE_TMDB_API_KEY;

//   // Fetch movies using Axios with cancel token for debounced requests
//   useEffect(() => {
//     if (!searchTerm) {
//       setSearchResults([]);
//       setIsLoading(false);
//       return;
//     }

//     const source = axios.CancelToken.source();
//     const fetchMovies = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.get(
//           `https://api.themoviedb.org/3/search/movie`,
//           {
//             params: {
//               api_key: apiKey,
//               query: searchTerm,
//               language: 'en-US',
//             },
//             cancelToken: source.token,
//           }
//         );
//         setSearchResults(response.data.results || []);
//       } catch (err) {
//         if (axios.isCancel(err)) return;
//         console.error(err);
//         setSearchResults([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     const debounce = setTimeout(fetchMovies, 300);
//     return () => {
//       clearTimeout(debounce);
//       source.cancel('Request cancelled');
//     };
//   }, [searchTerm, apiKey]);

//   // Handle scroll behavior
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };
//     if (window.innerWidth >= 768) {
//       window.addEventListener('scroll', handleScroll);
//     }
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Auto-scroll results when using keyboard navigation
//   useEffect(() => {
//     if (selectedIndex >= 0 && resultsRef.current) {
//       const selectedElement = resultsRef.current.children[selectedIndex];
//       if (selectedElement) {
//         selectedElement.scrollIntoView({
//           behavior: 'smooth',
//           block: 'nearest',
//         });
//       }
//     }
//   }, [selectedIndex]);

//   // Handle body overflow when search is active
//   useEffect(() => {
//     if (isSearchActive) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'auto';
//     }
//     return () => {
//       document.body.style.overflow = 'auto';
//     };
//   }, [isSearchActive]);

//   // Handle Ctrl + K shortcut globally
//   useEffect(() => {
//     const handleGlobalKeyDown = (e) => {
//       if (e.ctrlKey && e.key === 'k') {
//         e.preventDefault();
//         setIsSearchActive((prev) => {
//           if (!prev) {
//             // Opening search: focus input after state update
//             setTimeout(() => {
//               if (searchInputRef.current) {
//                 searchInputRef.current.focus();
//               }
//             }, 0);
//             return true;
//           } else {
//             // Closing search: reset state
//             setSearchTerm('');
//             setSelectedIndex(-1);
//             setSearchResults([]);
//             setIsLoading(false);
//             return false;
//           }
//         });
//       }
//     };

//     document.addEventListener('keydown', handleGlobalKeyDown);
//     return () => document.removeEventListener('keydown', handleGlobalKeyDown);
//   }, []);

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   const handleSearchFocus = () => {
//     setIsSearchActive(true);
//     // Focus input after state update
//     setTimeout(() => {
//       if (searchInputRef.current) {
//         searchInputRef.current.focus();
//       }
//     }, 0);
//   };

//   const closeSearchOverlay = () => {
//     setIsSearchActive(false);
//     setSearchTerm('');
//     setSelectedIndex(-1);
//     setSearchResults([]);
//     setIsLoading(false);
//   };

//   const handleSearchInput = (e) => {
//     setSearchTerm(e.target.value);
//     setSelectedIndex(-1);
//   };

//   const handleKeyDown = (e) => {
//     if (!isSearchActive) return;

//     if (e.key === 'Escape') {
//       closeSearchOverlay();
//     } else if (e.key === 'ArrowDown') {
//       e.preventDefault();
//       setSelectedIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : prev));
//     } else if (e.key === 'ArrowUp') {
//       e.preventDefault();
//       setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
//     } else if (e.key === 'Enter' && selectedIndex >= 0) {
//       e.preventDefault();
//       const selectedMovie = searchResults[selectedIndex];
//       navigate(`/movie/${selectedMovie.id}`);
//       closeSearchOverlay();
//     }
//   };

//   // Keyboard navigation for search results
//   useEffect(() => {
//     document.addEventListener('keydown', handleKeyDown);
//     return () => document.removeEventListener('keydown', handleKeyDown);
//   }, [isSearchActive, selectedIndex, searchResults]);

//   // Search term result
//   const SearchTermRes = (text, term) => {
//     if (!term) return text;
//     const regex = new RegExp(`(${term})`, 'gi');
//     const parts = text.split(regex);
//     return parts.map((part, index) =>
//       regex.test(part) ? (
//         <span key={index} className="font-bold">{part}</span>
//       ) : (
//         part
//       )
//     );
//   };

//   return (
//     <>
//       <nav
//         className={`
//           fixed z-50 px-4 transition-all duration-700 w-full
//           md:left-1/2 md:transform md:-translate-x-1/2
//           ${isScrolled
//             ? 'md:top-4 md:w-[80%] md:shadow-md md:bg-dark/80 md:backdrop-blur-md md:rounded-full md:border-2 md:border-white-custom'
//             : 'md:top-0 md:w-full md:bg-transparent'}
//           bg-dark/80 top-0
//         `}
//       >
//         <div className="w-full flex items-center justify-between py-2">
//           <div className="flex items-center gap-4">
//             <Link to="/">
//               <img
//                 src="/Logo.png"
//                 alt="Movie Recommendation System Logo"
//                 className="h-10"
//               />
//             </Link>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="relative font-bold">
//               <input
//                 type="text"
//                 placeholder="Ctrl + K to search"
//                 className="border border-light-gray p-1.5 rounded-full w-48 pr-8 bg-white-custom text-dark text-sm"
//                 onFocus={handleSearchFocus}
//               />
//               <button
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2 border-2 border-dark rounded-full p-1"
//                 onClick={handleSearchFocus}
//               >
//                 <FaSearch
//                   className="text-red-main hover:scale-110 transition-transform cursor-pointer"
//                   size={14}
//                 />
//               </button>
//             </div>

//             {user ? (
//               <>
//                 <Link to="/watchlist" className="border-2 border-dark rounded-full p-1">
//                   <FaBookmark className="text-red-main hover:scale-110 transition-transform" size={16} />
//                 </Link>
//                 <Link to="/likes" className="border-2 border-dark rounded-full p-1">
//                   <FaHeart className="text-red-main hover:scale-110 transition-transform" size={16} />
//                 </Link>
//                 <Link to="/profile" className="border-2 border-dark rounded-full p-1">
//                   <FaUserCircle className="text-red-main hover:scale-110 transition-transform" size={16} />
//                 </Link>
//                 <button onClick={handleLogout} className="cursor-pointer border-2 border-dark rounded-full p-1">
//                   <FaSignOutAlt className="text-red-main hover:scale-110 transition-transform" size={16} />
//                 </button>
//               </>
//             ) : (
//               <Link to="/login" className="border-2 border-dark rounded-full p-1">
//                 <FaUserCircle className="text-red-main hover:scale-110 transition-transform" size={16} />
//               </Link>
//             )}
//           </div>
//         </div>
//       </nav>

//       {isSearchActive && (
//         <div
//           className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-start justify-center pt-20"
//           onClick={closeSearchOverlay}
//         >
//           <div
//             className="bg-white-custom rounded-lg px-6 py-3 shadow-lg w-4/5 md:w-2/3 lg:w-1/2 flex flex-col gap-2 fixed top-20"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex items-center gap-2">
//               <FaSearch className="text-red-main" size={18} />
//               <input
//                 ref={searchInputRef}
//                 autoFocus
//                 type="text"
//                 placeholder="Search for movies..."
//                 className="bg-transparent w-full text-dark outline-none text-sm"
//                 value={searchTerm}
//                 onChange={handleSearchInput}
//               />
//             </div>

//             <div className="text-xs text-gray-500 mb-2">
//               Use ↑/↓ to navigate, Enter to select, Esc or Ctrl + K to close
//             </div>

//             {isLoading ? (
//               <div className="flex justify-center items-center py-4">
//                 <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-main text-red-main"></div>
//               </div>
//             ) : searchResults.length > 0 ? (
//               <ul
//                 ref={resultsRef}
//                 className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-red-main scrollbar-track-gray-200"
//               >
//                 {searchResults.map((movie, index) => (
//                   <li
//                     key={movie.id}
//                     className={`p-2 rounded-md cursor-pointer transition-all ${
//                       index === selectedIndex
//                         ? 'bg-red-main text-white'
//                         : 'hover:bg-gray-100 text-dark'
//                     }`}
//                     onClick={() => {
//                       navigate(`/movie/${movie.id}`);
//                       closeSearchOverlay();
//                     }}
//                     onMouseEnter={() => setSelectedIndex(index)}
//                   >
//                     {SearchTermRes(movie.title, searchTerm)}
//                   </li>
//                 ))}
//               </ul>
//             ) : searchTerm ? (
//               <div className="text-dark text-sm py-2">
//                 No movies found for "{searchTerm}"
//               </div>
//             ) : (
//               <div className="text-dark text-sm py-2">
//                 Start typing to search for movies...
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Navbar;

import { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaBookmark, FaHeart, FaSignOutAlt, FaUserCircle, FaSearch } from 'react-icons/fa';
import axios from 'axios';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [userInput, setUserInput] = useState(''); // Track user-typed input
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchInputRef = useRef(null);
  const resultsRef = useRef(null);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  // Fetch movies using Axios with cancel token for debounced requests
  useEffect(() => {
    if (!userInput) {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }

    const source = axios.CancelToken.source();
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie`,
          {
            params: {
              api_key: apiKey,
              query: userInput,
              language: 'en-US',
            },
            cancelToken: source.token,
          }
        );
        setSearchResults(response.data.results || []);
      } catch (err) {
        if (axios.isCancel(err)) return;
        console.error(err);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(fetchMovies, 300);
    return () => {
      clearTimeout(debounce);
      source.cancel('Request cancelled');
    };
  }, [userInput, apiKey]);

  // Update searchTerm when selectedIndex changes
  useEffect(() => {
    if (selectedIndex >= 0 && searchResults[selectedIndex]) {
      setSearchTerm(searchResults[selectedIndex].title);
    } else {
      setSearchTerm(userInput);
    }
  }, [selectedIndex, searchResults, userInput]);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    if (window.innerWidth >= 768) {
      window.addEventListener('scroll', handleScroll);
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll results when using keyboard navigation
  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const selectedElement = resultsRef.current.children[selectedIndex];
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    }
  }, [selectedIndex]);

  // Handle body overflow when search is active
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

  // Handle Ctrl + K shortcut globally
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        setIsSearchActive((prev) => {
          if (!prev) {
            setTimeout(() => {
              if (searchInputRef.current) {
                searchInputRef.current.focus();
              }
            }, 0);
            return true;
          } else {
            setSearchTerm('');
            setUserInput('');
            setSelectedIndex(-1);
            setSearchResults([]);
            setIsLoading(false);
            return false;
          }
        });
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearchFocus = () => {
    setIsSearchActive(true);
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 0);
  };

  const closeSearchOverlay = () => {
    setIsSearchActive(false);
    setSearchTerm('');
    setUserInput('');
    setSelectedIndex(-1);
    setSearchResults([]);
    setIsLoading(false);
  };

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setUserInput(value);
    setSearchTerm(value);
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
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0) {
        const selectedMovie = searchResults[selectedIndex];
        navigate(`/search?q=${encodeURIComponent(selectedMovie.title)}`);
        closeSearchOverlay();
      } else if (userInput) {
        navigate(`/search?q=${encodeURIComponent(userInput)}`);
        closeSearchOverlay();
      }
    }
  };

  // Keyboard navigation for search results
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isSearchActive, selectedIndex, searchResults, userInput]);

  // Search term result
  const SearchTermRes = (text, term) => {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="font-bold">{part}</span>
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
                value={searchTerm}
                onChange={handleSearchInput}
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
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-start justify-center pt-20"
          onClick={closeSearchOverlay}
        >
          <div
            className="bg-white-custom rounded-lg px-6 py-3 shadow-lg w-4/5 md:w-2/3 lg:w-1/2 flex flex-col gap-2 fixed top-20"
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
              Use ↑/↓ to navigate, Enter to select, Esc or Ctrl + K to close
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-main text-red-main"></div>
              </div>
            ) : searchResults.length > 0 ? (
              <ul
                ref={resultsRef}
                className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-red-main scrollbar-track-gray-200"
              >
                {searchResults.map((movie, index) => (
                  <li
                    key={movie.id}
                    className={`p-2 rounded-md cursor-pointer transition-all ${
                      index === selectedIndex
                        ? 'bg-red-main text-white'
                        : 'hover:bg-gray-100 text-dark'
                    }`}
                    onClick={() => {
                      navigate(`/movie/${movie.id}`);
                      closeSearchOverlay();
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    {SearchTermRes(movie.title, userInput)}
                  </li>
                ))}
              </ul>
            ) : userInput ? (
              <div className="text-dark text-sm py-2">
                No movies found for "{userInput}"
              </div>
            ) : (
              <div className="text-dark text-sm py-2">
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