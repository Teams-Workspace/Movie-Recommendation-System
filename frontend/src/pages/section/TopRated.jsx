import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { CACHE_TIME, STALE_TIME } from "../../utils/DataFetchTime";
import { trendingCarousel } from "../../api/apicalls";
import { ErrorUi } from "../../components/UI/ErrorUi";
import { TopRatedSkeleton } from "../../components/UI/Skeleton/TopRatedSkeleton";
import { TopRatedUi } from "../../components/UI/TopRatedUi";
import { addToWatchlist, removeFromWatchlist } from "../../features/watchlistSlice/watchlistSlice";

export const TopRated = () => {
  const dispatch = useDispatch();
  const { watchlist } = useSelector((state) => state.watchlist);
  const { user } = useSelector((state) => state.auth);
  const [isAdding, setIsAdding] = useState({});

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["topRatedMovies"],
    queryFn: async () => {
      try {
        const response = await trendingCarousel();
        return response.data;
      } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
      }
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

  const handleToggleWatchlist = async (movieId) => {
    if (!user) {
      toast.error('Please log in to add to watchlist', {
        position: 'bottom-center',
        style: {
          borderRadius: '10px',
          background: '#ff3333',
          color: '#fff',
        },
      });
      return;
    }

    if (isAdding[movieId]) return;

    setIsAdding(prev => ({ ...prev, [movieId]: true }));

    try {
      if (watchlist.includes(movieId.toString())) {
        await dispatch(removeFromWatchlist(movieId.toString())).unwrap();
        toast.success('Removed from your watchlist', {
          position: 'bottom-center',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      } else {
        await dispatch(addToWatchlist(movieId.toString())).unwrap();
        toast.success('Added to your watchlist', {
          position: 'bottom-center',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      }
    } catch (error) {
      console.error("Error toggling watchlist:", error);
      toast.error(error || 'Failed to update watchlist', {
        position: 'bottom-center',
        style: {
          borderRadius: '10px',
          background: '#ff3333',
          color: '#fff',
        },
      });
    } finally {
      setIsAdding(prev => ({ ...prev, [movieId]: false }));
    }
  };

  if (isPending) return <TopRatedSkeleton />;
  if (isError) return <ErrorUi error={error} onRetry={refetch} />;

  const displayedMovies = data?.results?.slice(0, 9) || [];

  return (
    <div className="container mx-auto px-4 mt-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Top Rated</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayedMovies.map((movie) => (
          <TopRatedUi
            key={movie.id}
            movie={movie}
            isInWatchlist={watchlist.includes(movie.id.toString())}
            isAdding={isAdding[movie.id]}
            handleToggleWatchlist={handleToggleWatchlist}
          />
        ))}
      </div>
    </div>
  );
};