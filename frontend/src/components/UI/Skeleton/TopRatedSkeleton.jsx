import { FaStarHalfAlt } from "react-icons/fa";

export const TopRatedSkeleton = () => {
  return (
    <div className="container mx-auto px-4 mt-2">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Top Rated</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-gray-950 rounded-lg overflow-hidden animate-pulse">
            <div className="relative h-48 bg-gray-800 rounded-t-lg">
              {/* Rating circle skeleton */}
              <div className="absolute -bottom-5 left-4 h-10 w-10 rounded-full bg-gray-800 border-2 border-gray-700 flex items-center justify-center">
                <div className="h-4 w-4 bg-gray-600 rounded-full"></div>
              </div>
            </div>

            <div className="p-4 pt-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2 w-full">
                  <div className="h-5 w-3/4 bg-gray-800 rounded"></div>
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-8 bg-gray-800 rounded"></div>
                    <div className="h-4 w-4 bg-gray-800 rounded-full"></div>
                    <div className="h-4 w-12 bg-gray-800 rounded"></div>
                  </div>
                </div>

                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStarHalfAlt key={i} className="w-4 h-4 text-gray-700" />
                  ))}
                </div>
              </div>

              <div className="mt-3 space-y-2">
                <div className="h-4 w-full bg-gray-800 rounded"></div>
                <div className="h-4 w-2/3 bg-gray-800 rounded"></div>
              </div>

              <div className="mt-4 flex space-x-2">
                <div className="flex-1 h-8 bg-gray-800 rounded-md"></div>
                <div className="flex-1 h-8 bg-gray-800 rounded-md flex items-center justify-center">
                  {/* <BookmarkCheck className="w-4 h-4 text-gray-600" /> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};