// src/pages/NewRelease.jsx
import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { CACHE_TIME, STALE_TIME } from "../../utils/DataFetchTime";
import { newRelease } from "../../api/apicalls";
import { ErrorUi } from "../../components/UI/ErrorUi";
import { NewReleaseSkeleton } from "../../components/UI/Skeleton/NewReleaseSkeleton";
import { ArrowButton, MovieCard } from "../../components/UI/NewReleaseUi";
import { addLike, removeLike } from '../../features/likesSlice/likesSlice'

export const NewRelease = () => {
  const dispatch = useDispatch();
  const { likedMovies } = useSelector((state) => state.likes);
  const { user } = useSelector((state) => state.auth); // Get user from auth slice
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isLiking, setIsLiking] = useState({});

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["newRelease"],
    queryFn: async () => {
      const response = await newRelease();
      return response.data;
    },
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    // Optional: Add this if you want to prevent background refetches entirely
    refetchInterval: false,
    refetchIntervalInBackground: false,
  
  });

  const scroll = (direction) => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.75;
    container.scrollBy({ 
      left: direction === "left" ? -scrollAmount : scrollAmount, 
      behavior: "smooth" 
    });

    setTimeout(() => updateArrowVisibility(), 400);
  };

  const updateArrowVisibility = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const handleToggleLike = async (movieId) => {
    if (!user) {
      toast.error('Please log in to like movies', {
        position: 'bottom-center',
        style: {
          borderRadius: '10px',
          background: '#ff3333',
          color: '#fff',
        },
      });
      return;
    }

    if (isLiking[movieId]) return;

    setIsLiking(prev => ({ ...prev, [movieId]: true }));

    try {
      if (likedMovies.includes(movieId.toString())) {
        await dispatch(removeLike(movieId.toString())).unwrap();
        toast.success('Removed from your likes', {
          position: 'bottom-center',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      } else {
        await dispatch(addLike(movieId.toString())).unwrap();
        toast.success('Added to your likes', {
          position: 'bottom-center',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      toast.error(error || 'Failed to update likes', {
        position: 'bottom-center',
        style: {
          borderRadius: '10px',
          background: '#ff3333',
          color: '#fff',
        },
      });
    } finally {
      setIsLiking(prev => ({ ...prev, [movieId]: false }));
    }
  };

  if (isPending) return <NewReleaseSkeleton />;
  if (isError) return <ErrorUi error={error} onRetry={refetch} />;

  return (
    <div className="container mx-auto px-4 mt-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">New Releases</h2>

      <div className="relative group">
        {showLeftArrow && (
          <ArrowButton direction="left" onClick={() => scroll("left")} />
        )}
        {showRightArrow && (
          <ArrowButton direction="right" onClick={() => scroll("right")} />
        )}

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide gap-4 pb-4"
          onScroll={updateArrowVisibility}
        >
          {data?.results?.map((movie) => (
            <MovieCard 
              key={movie.id}
              movie={movie}
              isLiked={likedMovies.includes(movie.id.toString())}
              isLiking={isLiking[movie.id]}
              onToggleLike={handleToggleLike}
            />
          ))}
        </div>
      </div>
    </div>
  );
};