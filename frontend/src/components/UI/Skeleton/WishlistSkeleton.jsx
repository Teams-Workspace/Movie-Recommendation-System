import { LuBookmarkPlus } from "react-icons/lu";


export const WatchlistSkeleton = () => {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <div className="min-h-screen bg-black text-white-custom pb-16">
        {/* Background gradient */}
        <div className="fixed inset-0 z-0 bg-gradient-to-b "></div>

        <div className="relative z-10 container mx-auto px-4 py-16 mt-8 animate-pulse">
          {/* Header Skeleton */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <div className="h-8 w-48 bg-gray-800 rounded mb-2"></div>
              <div className="h-4 w-32 bg-gray-800 rounded"></div>
            </div>
          </div>

          {/* Grid Skeleton */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="group relative">
                {/* Poster Skeleton */}
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
                  <div className="absolute inset-0 flex items-center justify-center">
                  </div>
                </div>
                
                {/* Info Skeleton */}
                <div className="mt-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="h-3 w-12 bg-gray-800 rounded"></div>
                    <div className="h-3 w-8 bg-gray-800 rounded"></div>
                  </div>
                  <div className="h-4 w-3/4 bg-gray-800 rounded mb-1"></div>
                  <div className="h-3 w-1/2 bg-gray-800 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

