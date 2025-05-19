
import { LuCircleArrowOutDownLeft } from "react-icons/lu";
import { LuCircleArrowOutDownRight } from "react-icons/lu";

import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import CustomLoader from "../cusloader";

function HorizontalScroll({ apiKey }) {
  const navigate = useNavigate();
  const { addToLikes, getLikes, removeFromLikes } = useContext(AuthContext);
  const scrollContainerRef = useRef(null);
  const [movies, setMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [isLiking, setIsLiking] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // Fetch popular movies
        const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=3`;
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setMovies(data.results || []);

        // Fetch liked movies
        const likedIds = await getLikes();
        console.log('HorizontalScroll likedIds:', likedIds);
        setLikedMovies(Array.isArray(likedIds) ? likedIds.map(id => String(id)) : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [apiKey, getLikes]);

  const scroll = (direction) => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.75;

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }

    setTimeout(() => {
      if (!scrollContainerRef.current) return;
      setShowLeftArrow(scrollContainerRef.current.scrollLeft > 0);
      setShowRightArrow(
        scrollContainerRef.current.scrollLeft <
          scrollContainerRef.current.scrollWidth -
            scrollContainerRef.current.clientWidth -
            10
      );
    }, 400);
  };

  const handleToggleLike = async (movieId) => {
    const isLiked = likedMovies.includes(String(movieId));
    setIsLiking((prev) => ({ ...prev, [movieId]: true }));

    try {
      if (isLiked) {
        // Unlike
        const result = await removeFromLikes(String(movieId));
        setLikedMovies((prev) => prev.filter((id) => id !== String(movieId)));
        toast.success(result.message || "Movie removed from likes", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      } else {
        // Like
        const result = await addToLikes(String(movieId));
        setLikedMovies((prev) => [...prev, String(movieId)]);
        toast.success(result.message || "Added to likes", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      }
    } catch (err) {
      toast.error(err.message || `Failed to ${isLiked ? 'remove from' : 'add to'} likes`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } finally {
      setIsLiking((prev) => ({ ...prev, [movieId]: false }));
    }
  };

  if (error) {
    return (
      <div className="h-[350px] flex items-center justify-center bg-gray-900">
        <p className="text-red-500 text-center">
          Error fetching movies: {error}
        </p>
      </div>
    );
  }

  if (loading) {
    return <CustomLoader />;
  }

  return (
    <div className="relative group">
      {/* Left Arrow */}
      {showLeftArrow && (
        <button
          variant="outline"
          size="icon"
          className="cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 border-none rounded-full w-10 h-10 -ml-5 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll("left")}
        >
          <LuCircleArrowOutDownLeft className="h-6 w-6 text-white" />
          <span className="sr-only">Scroll left</span>
        </button>
      )}

      {/* Right Arrow */}
      {showRightArrow && (
        <button
          variant="outline"
          size="icon"
          className="cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 border-none rounded-full w-10 h-10 -mr-5 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll("right")}
        >
          <LuCircleArrowOutDownRight className="h-6 w-6 text-white" />
          <span className="sr-only">Scroll right</span>
        </button>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide gap-4 pb-4"
        onScroll={() => {
          if (!scrollContainerRef.current) return;
          setShowLeftArrow(scrollContainerRef.current.scrollLeft > 0);
          setShowRightArrow(
            scrollContainerRef.current.scrollLeft <
              scrollContainerRef.current.scrollWidth -
                scrollContainerRef.current.clientWidth -
                10
          );
        }}
      >
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className="flex-shrink-0 w-[180px] relative group/item"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="relative h-[270px] rounded-lg overflow-hidden">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className={`object-cover transition-all duration-500 ${
                  hoveredIndex === index ? "scale-110 brightness-110" : ""
                }`}
              />

              {/* Hover overlay with Like icon */}
              <div
                className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300 ${
                  hoveredIndex === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <button
                  className="cursor-pointer transform translate-y-4 opacity-0 group-hover/item:translate-y-0 group-hover/item:opacity-100 transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleLike(movie.id);
                  }}
                  disabled={isLiking[movie.id]}
                >
                  {isLiking[movie.id] ? (
                    <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Heart
                      className={`w-8 h-8 text-red-600 ${
                        likedMovies.includes(String(movie.id)) ? 'fill-red-500' : 'fill-none'
                      }`}
                    />
                  )}
                  <span className="sr-only">{likedMovies.includes(String(movie.id)) ? 'Unlike' : 'Like'}</span>
                </button>
              </div>
            </div>

            <div className="mt-2">
              <div className="flex items-center space-x-2 mb-1">
                <div className="flex items-center text-yellow-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-3 h-3 text-yellow-400 mr-1"
                  >
                    <path d="M12 .587l3.668 7.431 8.332 1.151-6.001 5.852 1.417 8.257L12 18.893l-7.416 3.385 1.417-8.257-6.001-5.852 8.332-1.151z" />
                  </svg>
                  <span className="text-xs">
                    {movie.vote_average.toFixed(1)}
                  </span>
                </div>

                <span className="text-xs text-gray-400">
                  {new Date(movie.release_date).getFullYear() || "N/A"}
                </span>
              </div>
              <button
                className="text-sm font-medium line-clamp-1 cursor-pointer"
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                {movie.title}
              </button>
              <p className="text-xs text-gray-400 mt-1">
                {movie.genre_ids.length > 0 ? "Action, Drama" : "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HorizontalScroll;


// import CustomLoader from "../cusloader";

// function HorizontalScroll({ apiKey }) {
//   const navigate = useNavigate();
//   const scrollContainerRef = useRef(null);
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showLeftArrow, setShowLeftArrow] = useState(false);
//   const [showRightArrow, setShowRightArrow] = useState(true);
//   const [hoveredIndex, setHoveredIndex] = useState(null);

//   useEffect(() => {
//     async function fetchMovies() {
//       try {
//         setLoading(true);
//         const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=3`;
//         const response = await fetch(API_URL);
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         setMovies(data.results || []);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchMovies();
//   }, [apiKey]);

//   const scroll = (direction) => {
//     if (!scrollContainerRef.current) return;

//     const container = scrollContainerRef.current;
//     const scrollAmount = container.clientWidth * 0.75;

//     if (direction === "left") {
//       container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
//     } else {
//       container.scrollBy({ left: scrollAmount, behavior: "smooth" });
//     }

//     setTimeout(() => {
//       if (!scrollContainerRef.current) return;
//       setShowLeftArrow(scrollContainerRef.current.scrollLeft > 0);
//       setShowRightArrow(
//         scrollContainerRef.current.scrollLeft <
//           scrollContainerRef.current.scrollWidth -
//             scrollContainerRef.current.clientWidth -
//             10
//       );
//     }, 400);
//   };

//   if (error) {
//     return (
//       <div className="h-[350px] flex items-center justify-center bg-gray-900">
//         <p className="text-red-500 text-center">
//           Error fetching movies: {error}
//         </p>
//       </div>
//     );
//   }

//   if (loading) {
//     return <CustomLoader />;
//   }

//   return (
//     <div className="relative group">
//       {/* Left Arrow */}
//       {showLeftArrow && (
//         <button
//           variant="outline"
//           size="icon"
//           className="cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 border-none rounded-full w-10 h-10 -ml-5 opacity-0 group-hover:opacity-100 transition-opacity"
//           onClick={() => scroll("left")}
//         >
//           <LuCircleArrowOutDownLeft className="h-6 w-6 text-white" />
//           <span className="sr-only">Scroll left</span>
//         </button>
//       )}

//       {/* Right Arrow */}
//       {showRightArrow && (
//         <button
//           variant="outline"
//           size="icon"
//           className="cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 border-none rounded-full w-10 h-10 -mr-5 opacity-0 group-hover:opacity-100 transition-opacity"
//           onClick={() => scroll("right")}
//         >
//           <LuCircleArrowOutDownRight className="h-6 w-6 text-white" />
//           <span className="sr-only">Scroll right</span>
//         </button>
//       )}

//       {/* Scrollable Container */}
//       <div
//         ref={scrollContainerRef}
//         className="flex overflow-x-auto scrollbar-hide gap-4 pb-4"
//         onScroll={() => {
//           if (!scrollContainerRef.current) return;
//           setShowLeftArrow(scrollContainerRef.current.scrollLeft > 0);
//           setShowRightArrow(
//             scrollContainerRef.current.scrollLeft <
//               scrollContainerRef.current.scrollWidth -
//                 scrollContainerRef.current.clientWidth -
//                 10
//           );
//         }}
//       >
//         {movies.map((movie, index) => (
//           <div
//             key={movie.id}
//             className="flex-shrink-0 w-[180px] relative group/item"
//             onMouseEnter={() => setHoveredIndex(index)}
//             onMouseLeave={() => setHoveredIndex(null)}
//           >
//             <div className="relative h-[270px] rounded-lg overflow-hidden">
//               <img
//                 src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//                 alt={movie.title}
//                 className={`object-cover transition-all duration-500 ${
//                   hoveredIndex === index ? "scale-110 brightness-110" : ""
//                 }`}
//               />

//               {/* Hover overlay with Like icon */}
//               <div
//                 className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300 ${
//                   hoveredIndex === index ? "opacity-100" : "opacity-0"
//                 }`}
//               >
//                 <div className="cursor-pointer transform translate-y-4 opacity-0 group-hover/item:translate-y-0 group-hover/item:opacity-100 transition-all duration-300">
//                   <FaHeartCirclePlus className="w-8 h-8 text-red-600" />
//                 </div>
//               </div>
//             </div>

//             <div className="mt-2">
//               <div className="flex items-center space-x-2 mb-1">
//                 <div className="flex items-center text-yellow-400">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="currentColor"
//                     viewBox="0 0 24 24"
//                     className="w-3 h-3 text-yellow-400 mr-1"
//                   >
//                     <path d="M12 .587l3.668 7.431 8.332 1.151-6.001 5.852 1.417 8.257L12 18.893l-7.416 3.385 1.417-8.257-6.001-5.852 8.332-1.151z" />
//                   </svg>
//                   <span className="text-xs">
//                     {movie.vote_average.toFixed(1)}
//                   </span>
//                 </div>

//                 <span className="text-xs text-gray-400">
//                   {new Date(movie.release_date).getFullYear() || "N/A"}
//                 </span>
//               </div>
//               <button
//                 className="text-sm font-medium line-clamp-1 cursor-pointer  "
//                 onClick={() => navigate(`/movie/${movie.id}`)}
//               >
//                 {movie.title}
//               </button>
//               <p className="text-xs text-gray-400 mt-1">
//                 {movie.genre_ids.length > 0 ? "Action, Drama" : "N/A"}{" "}
//                 {/* Placeholder genres */}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default HorizontalScroll;
