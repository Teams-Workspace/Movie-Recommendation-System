import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { CACHE_TIME, STALE_TIME } from "../utils/DataFetchTime";
import { getMoviesByIds } from "../api/apicalls";
import { ErrorUi } from "../components/UI/ErrorUi";
import { WatchlistSkeleton } from "../components/UI/Skeleton/WishlistSkeleton";
import { MovieGrid } from "../components/UI/WatchListUi";
import { removeFromWatchlist } from "../features/watchlistSlice/watchlistSlice";

export const WatchlistPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { watchlist } = useSelector((state) => state.watchlist);
  const [isRemoving, setIsRemoving] = useState({});

  // Fetch full movie details for watchlist movies
  const {
    data: watchlistMoviesData,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["watchlistMoviesDetails", watchlist],
    queryFn: () => getMoviesByIds(watchlist),
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
    enabled: !!user, // Only check for user existence
  });

  const handleRemoveFromWatchlist = async (movieId) => {
    if (!user) {
      toast.error("Please log in to manage watchlist", {
        position: "bottom-center",
        style: {
          borderRadius: "10px",
          background: "#ff3333",
          color: "#fff",
        },
      });
      return;
    }

    if (isRemoving[movieId]) return;

    setIsRemoving((prev) => ({ ...prev, [movieId]: true }));

    try {
      await dispatch(removeFromWatchlist(movieId.toString())).unwrap();
      toast.success("Removed from your watchlist", {
        position: "bottom-center",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      console.error("Error removing from watchlist:", error);
      toast.error(error?.message || "Failed to remove from watchlist", {
        position: "bottom-center",
        style: {
          borderRadius: "10px",
          background: "#ff3333",
          color: "#fff",
        },
      });
    } finally {
      setIsRemoving((prev) => ({ ...prev, [movieId]: false }));
    }
  };

  // Show skeleton only when data is loading and user is logged in
  if (isPending && user) return <WatchlistSkeleton />;
  if (isError) return <ErrorUi error={error} onRetry={refetch} />;

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <div className="min-h-screen bg-black text-white-custom pb-16">
        <div className="relative z-10 container mx-auto px-4 py-16 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Your Watchlist</h1>
              <p className="text-gray-400">
                {watchlistMoviesData?.length || 0} movies in watchlist
              </p>
            </div>
          </div>

          {!user ? (
            <div className="text-center py-16">
              <h2 className="text-xl text-gray-400">
                Please log in to view your watchlist
              </h2>
            </div>
          ) : watchlistMoviesData?.length > 0 ? (
            <MovieGrid
              movies={watchlistMoviesData}
              isRemoving={isRemoving}
              onRemove={handleRemoveFromWatchlist}
            />
          ) : (
            <div className="text-center py-16">
              <h2 className="text-xl text-gray-400">Your watchlist is empty</h2>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
