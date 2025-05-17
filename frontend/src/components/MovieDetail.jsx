import { useState, useEffect, useRef, useContext } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaRegCirclePlay } from "react-icons/fa6";
import { TiStarFullOutline } from "react-icons/ti";
import { FaClock } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { IoBookmarkOutline } from "react-icons/io5";
import { AuthContext } from "../context/AuthContext";
import SiteFooter from "./SiteFooter";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MovieDetail() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("q") || "";

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Refs for GSAP animations
  const containerRef = useRef(null);
  const backdropRef = useRef(null);
  const contentRef = useRef(null);
  const posterRef = useRef(null);
  const infoRef = useRef(null);
  const descriptionRef = useRef(null);
  const castRef = useRef(null);
  const similarRef = useRef(null);

  const BASE_URL = "https://api.themoviedb.org/3";
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  // Fetch movie data
  useEffect(() => {
    const fetchMovieData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch movie details
        const movieResponse = await fetch(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        if (!movieResponse.ok)
          throw new Error(`Movie error! Status: ${movieResponse.status}`);
        const movieData = await movieResponse.json();

        // Fetch credits
        const creditsResponse = await fetch(
          `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`
        );
        if (!creditsResponse.ok)
          throw new Error(`Credits error! Status: ${creditsResponse.status}`);
        const creditsData = await creditsResponse.json();

        // Fetch videos (trailer)
        const videosResponse = await fetch(
          `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
        );
        if (!videosResponse.ok)
          throw new Error(`Videos error! Status: ${videosResponse.status}`);
        const videosData = await videosResponse.json();

        // Fetch similar movies
        const similarResponse = await fetch(
          `${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`
        );
        if (!similarResponse.ok)
          throw new Error(`Similar error! Status: ${similarResponse.status}`);
        const similarData = await similarResponse.json();

        // Map movie data
        const movieFormatted = {
          id: movieData.id,
          title: movieData.title,
          posterUrl: movieData.poster_path
            ? `${IMAGE_BASE_URL}/w500${movieData.poster_path}`
            : "/placeholder.svg",
          backdropUrl: movieData.backdrop_path
            ? `${IMAGE_BASE_URL}/w1280${movieData.backdrop_path}`
            : "/placeholder.svg",
          year: movieData.release_date
            ? movieData.release_date.split("-")[0]
            : "N/A",
          duration: movieData.runtime
            ? `${Math.floor(movieData.runtime / 60)}h ${
                movieData.runtime % 60
              }m`
            : "N/A",
          genre: movieData.genres.map((g) => g.name),
          description: movieData.overview || "No description available.",
          rating: movieData.vote_average
            ? movieData.vote_average.toFixed(1)
            : "N/A",
          director:
            creditsData.crew.find((c) => c.job === "Director")?.name ||
            "Unknown Director",
        };

        // Map cast data (limit to 4)
        const castFormatted = creditsData.cast.slice(0, 4).map((member) => ({
          name: member.name,
          role: member.character || "N/A",
          image: member.profile_path
            ? `${IMAGE_BASE_URL}/w200${member.profile_path}`
            : "/placeholder.svg",
        }));

        // Find trailer
        const trailerData = videosData.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        // Map similar movies (limit to 6)
        const similarMoviesFormatted = similarData.results
          .slice(0, 6)
          .map((m) => ({
            id: m.id,
            title: m.title,
            posterUrl: m.poster_path
              ? `${IMAGE_BASE_URL}/w500${m.poster_path}`
              : "/placeholder.svg",
            backdropUrl: m.backdrop_path
              ? `${IMAGE_BASE_URL}/w1280${m.backdrop_path}`
              : "/placeholder.svg",
            year: m.release_date ? m.release_date.split("-")[0] : "N/A",
            duration: "N/A",
            genre: m.genre_ids.map((id) => {
              const genres = {
                28: "Action",
                35: "Comedy",
                18: "Drama",
                878: "Sci-Fi",
              };
              return genres[id] || "Other";
            }),
            description: m.overview || "No description available.",
            rating: m.vote_average ? m.vote_average.toFixed(1) : "N/A",
          }));

        setMovie(movieFormatted);
        setCast(castFormatted);
        setTrailer(trailerData);
        setSimilarMovies(similarMoviesFormatted);
      } catch (err) {
        setError(err.message);
        setMovie(null);
        setCast([]);
        setTrailer(null);
        setSimilarMovies([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieData();
  }, [id, API_KEY]);

  // GSAP animations
  useEffect(() => {
    if (isLoading || !movie) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2 }
    )
      .fromTo(
        posterRef.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8 },
        "-=0.8"
      )
      .fromTo(
        infoRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      )
      .fromTo(
        descriptionRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.4"
      );

    gsap.fromTo(
      castRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: castRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      similarRef.current?.querySelectorAll(".movie-card"),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        scrollTrigger: {
          trigger: similarRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.to(backdropRef.current, {
      y: "30%",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isLoading, movie]);

  // Search results (filtered from similar movies)
  const searchResults = searchQuery
    ? similarMovies
        .filter(
          (m) =>
            m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.genre.some((g) =>
              g.toLowerCase().includes(searchQuery.toLowerCase())
            )
        )
        .slice(0, 4)
    : [];

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black z-50">
        <div className="w-16 h-16 border-4 border-red-main border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="container mx-auto px-4 py-16 mt-8 bg-black">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-white-custom">
            {error || "Movie not found"}
          </h1>
          <p className="text-gray-400 mb-8">
            {error
              ? "An error occurred while fetching the movie."
              : "The movie you're looking for doesn't exist or has been removed."}
          </p>
          <button className="bg-red-main text-white-custom px-6 py-2 rounded-md hover:bg-red-main/90">
            <Link to="/">Back to Home</Link>
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div ref={containerRef} className="relative bg-black text-white-custom">
        {/* Backdrop */}
        <div ref={backdropRef} className="fixed inset-0 z-0">
          <img
            src={movie.backdropUrl}
            alt=""
            className="object-cover w-full h-full opacity-30"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />
        </div>

        {/* Main Content */}
        <div ref={contentRef} className="relative  z-10 pt-8 pb-16">
          <div className="container mx-auto px-4 mt-10">
            {/* Movie Header */}
            <div className="flex flex-col md:flex-row gap-8 mb-12">
              {/* Poster */}
              <div
                ref={posterRef}
                className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0"
              >
                <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Movie Info */}
              <div ref={infoRef} className="flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  {movie.genre.map((genre, index) => (
                    <span
                      key={index}
                      className="bg-white/10 text-white-custom px-3 py-1 text-xs rounded-full"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {movie.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-6">
                  <div className="flex items-center">
                    <TiStarFullOutline className="w-5 h-5 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="font-medium">{movie.rating}/10</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="w-4 h-4 mr-1" />
                    <span>{movie.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <FaRegCalendarAlt className="w-4 h-4 mr-1" />
                    <span>{movie.year}</span>
                  </div>
                </div>

                <div ref={descriptionRef} className="mb-6">
                  <p className="text-gray-300 leading-relaxed">
                    {showFullDescription
                      ? movie.description
                      : `${movie.description.substring(0, 200)}${
                          movie.description.length > 200 ? "..." : ""
                        }`}
                  </p>
                  {movie.description.length > 200 && (
                    <button
                      className="text-red-main mt-2 hover:underline"
                      onClick={() =>
                        setShowFullDescription(!showFullDescription)
                      }
                    >
                      {showFullDescription ? "Show Less" : "Read More"}
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    className={`border border-gray-700 hover:bg-gray-800 text-white-custom px-6 py-2 rounded-md ${
                      isLiked ? "text-red-500" : ""
                    }`}
                    onClick={() => setIsLiked(!isLiked)}
                    disabled={!user}
                  >
                    <FaRegHeart
                      className={`w-5 h-5 mr-2 inline ${
                        isLiked ? "fill-current" : ""
                      }`}
                    />
                    {isLiked ? "Liked" : "Like"}
                  </button>
                  <button
                    className={`border border-gray-700 hover:bg-gray-800 text-white-custom px-6 py-2 rounded-md ${
                      isBookmarked ? "text-red-main" : ""
                    }`}
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    disabled={!user}
                  >
                    <IoBookmarkOutline className="w-5 h-5 mr-2 inline" />
                    {isBookmarked ? "Saved" : "Watchlist"}
                  </button>
                </div>
              </div>
            </div>

            {/* Trailer */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-6 text-white-custom">
                Trailer
              </h2>
              <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden group">
                {trailer ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    frameBorder="0"
                    allow="accelerometer; autoFaRegCirclePlay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                ) : (
                  <>
                    <img
                      src={movie.backdropUrl}
                      alt={`${movie.title} trailer`}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="rounded-full h-16 w-16 bg-red-main hover:bg-red-main/90 group-hover:scale-110 transition-transform duration-300">
                        <FaRegCirclePlay className="h-8 w-8 fill-current ml-1" />
                        <span className="sr-only">FaRegCirclePlay trailer</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Cast */}
            <div ref={castRef} className="mb-16">
              <h2 className="text-2xl font-bold mb-6 text-white-custom">
                Cast
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {cast.map((person, index) => (
                  <div key={index} className="group cursor-pointer">
                    <div className="relative aspect-square rounded-xl overflow-hidden mb-2">
                      <img
                        src={person.image}
                        alt={person.name}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <h3 className="font-medium text-white-custom">
                      {person.name}
                    </h3>
                    <p className="text-sm text-gray-400">{person.role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Search Results (if coming from search) */}
            {searchResults.length > 0 && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6 text-white-custom">
                  More Results for "{searchQuery}"
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {searchResults.map((movie) => (
                    <Link
                      to={`/movie/${movie.id}?q=${encodeURIComponent(
                        searchQuery
                      )}`}
                      key={movie.id}
                    >
                      <div className="flex bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-colors">
                        <div className="relative h-24 w-16 flex-shrink-0">
                          <img
                            src={movie.posterUrl}
                            alt={movie.title}
                            className="object-cover w-full h-full"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-3 flex-1">
                          <h3 className="font-medium text-white-custom line-clamp-1">
                            {movie.title}
                          </h3>
                          <div className="flex items-center text-xs text-gray-400 mt-1">
                            <span>{movie.year}</span>
                            <span className="mx-1">•</span>
                            <span>{movie.duration}</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <TiStarFullOutline className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
                            <span className="text-xs">{movie.rating}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                  <button className="w-full border border-gray-700 hover:bg-gray-800 text-white-custom px-4 py-2 rounded-md">
                    <Link to={`/search?q=${encodeURIComponent(searchQuery)}`}>
                      View All Results
                    </Link>
                  </button>
                </div>
              </div>
            )}

            {/* Similar Movies */}
            <div ref={similarRef}>
              <h2 className="text-2xl font-bold mb-6 text-white-custom">
                You May Also Like
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {similarMovies.map((movie) => (
                  <Link
                    to={`/movie/${movie.id}`}
                    key={movie.id}
                    className="movie-card"
                  >
                    <div className="group">
                      <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-2">
                        <img
                          src={movie.posterUrl}
                          alt={movie.title}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button className="bg-red-main hover:bg-red-main/90 text-white-custom px-4 py-1 rounded-md">
                            <FaRegCirclePlay className="h-4 w-4 fill-current mr-1 inline" />{" "}
                            Watch
                          </button>
                        </div>
                      </div>
                      <h3 className="font-medium text-sm text-white-custom line-clamp-1">
                        {movie.title}
                      </h3>
                      <div className="flex items-center text-xs text-gray-400">
                        <TiStarFullOutline className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
                        <span>{movie.rating}</span>
                        <span className="mx-1">•</span>
                        <span>{movie.year}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full">
        <SiteFooter />
      </div>
    </>
  );
}
