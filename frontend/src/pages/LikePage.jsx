import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { CACHE_TIME, STALE_TIME } from "../utils/DataFetchTime";
import { ErrorUi } from "../components/UI/ErrorUi";
import { WatchlistSkeleton } from "../components/UI/Skeleton/WishlistSkeleton";
import { MovieGrid } from "../components/UI/LikePageUi";
import { removeLike } from "../features/likesSlice/likesSlice";
import { getMoviesByIds } from "../api/apicalls";

export const LikesPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { likedMovies } = useSelector((state) => state.likes);
  const [isRemoving, setIsRemoving] = useState({});

  // Fetch full movie details for liked movies
  const {
    data: likedMoviesData,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["likedMoviesDetails", likedMovies],
    queryFn: () => getMoviesByIds(likedMovies), // Use the reusable function
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
    enabled: !!user, // Only fetch if user is logged in and has liked movies
  });

  const handleRemoveLike = async (movieId) => {
    if (!user) {
      toast.error("Please log in to manage likes", {
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
      await dispatch(removeLike(movieId.toString())).unwrap();
      toast.success("Removed from your likes", {
        position: "bottom-center",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      console.error("Error removing like:", error);
      toast.error(error?.message || "Failed to remove like", {
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

  if (isPending && user) return <WatchlistSkeleton />;
  if (isError) return <ErrorUi error={error} onRetry={refetch} />;

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <div className="min-h-screen bg-black text-white-custom pb-16">
        <div className="relative z-10 container mx-auto px-4 py-16 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Your Liked Movies</h1>
              <p className="text-gray-400">
                {likedMoviesData?.length || 0} movies liked
              </p>
            </div>
          </div>
          {!user ? (
            <div className="text-center py-16">
              <h2 className="text-xl text-gray-400">
                Please log in to view your liked movies
              </h2>
            </div>
          ) : likedMoviesData?.length > 0 ? (
            <MovieGrid
              movies={likedMoviesData}
              isRemoving={isRemoving}
              onRemove={handleRemoveLike}
            
            />
          ) : (
            <div className="text-center py-16">
              <h2 className="text-xl text-gray-400">You haven't liked any movies yet</h2>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
