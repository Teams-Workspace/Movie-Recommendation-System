import { useQuery } from "@tanstack/react-query";
import { trendingCarousel } from "../../api/apicalls";
import { ErrorUi } from "../../components/UI/ErrorUi";
import { CACHE_TIME, STALE_TIME } from "../../utils/DataFetchTime";
import { NewReleaseSkeleton } from "../../components/UI/Skeleton/NewReleaseSkeleton";
import { MovieCarousel } from "../../components/UI/TrendingNowUi";

export const TrendingNow = () => {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["movieCoursel"],
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
  });

  if (isPending) return <NewReleaseSkeleton />;
  if (isError) return <ErrorUi error={error} onRetry={refetch} />;

  return (
    <MovieCarousel 
      movies={data?.results || []} 
      title="Trending Now"
    />
  );
};