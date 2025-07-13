import { useQuery } from "@tanstack/react-query";
import { movieCarousel } from "../../api/apicalls";
import { MovieCourselSkeleton } from "../../components/UI/Skeleton/MovieCourselSkeleton";
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MovieCarouselUI } from "../../components/UI/MovieCourselUI";
import { ErrorUi } from "../../components/UI/ErrorUi";
import { CACHE_TIME, STALE_TIME } from "../../utils/DataFetchTime";

// Extended cache configuration (2 weeks)
const CAROUSEL_INTERVAL = 4000; // 4 seconds rotation

export const MovieCoursel = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const navigate = useNavigate();

  const getMovieData = async () => {
    try {
      const response = await movieCarousel();
      return response.data;
    } catch (error) {
      console.error("Error fetching movies:", error);
      throw error;
    }
  };

  // Optimized query with long-term caching
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["movieCoursel"],
    queryFn: getMovieData,
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    // Optional: Add this if you want to prevent background refetches entirely
    refetchInterval: false,
    refetchIntervalInBackground: false,
  });

  const movieData = data?.results || [];

  // Memoized navigation functions
  const next = useCallback(() => {
    if (!movieData.length) return;
    setDirection(1);
    setCurrent((current) => (current === movieData.length - 1 ? 0 : current + 1));
  }, [movieData]);

  const prev = useCallback(() => {
    if (!movieData.length) return;
    setDirection(-1);
    setCurrent((current) => (current === 0 ? movieData.length - 1 : current - 1));
  }, [movieData]);



  // Auto-rotation effect
  useEffect(() => {
    if (movieData.length === 0) return;
    
    const interval = setInterval(() => {
      next();
    }, CAROUSEL_INTERVAL);

    return () => clearInterval(interval);
  }, [next, movieData.length]);

  // Loading and error states
  if (isPending) {
    return <MovieCourselSkeleton />;
  }

   if (isError) {
    return <ErrorUi error={error} onRetry={refetch} />;
  }

  // Main render
  return (
    <MovieCarouselUI
      movieData={movieData}
      current={current}
      direction={direction}
      navigate={navigate}
      next={next}
      prev={prev}
    />
  );
};