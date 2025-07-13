export const MovieCourselSkeleton  = () => {
  return (
    <>
      <div className="relative h-screen w-screen overflow-hidden bg-gray-900">
        {/* Background skeleton */}
        <div className="absolute inset-0 z-10">
          <div className="absolute inset-0 bg-gray-800/50" />
        </div>

        {/* Content area skeleton */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between">
            {/* Text content skeleton */}
            <div className="w-full md:w-1/2 space-y-6 mb-8 md:mb-0">
              <div className="space-y-4 opacity-100">
                {/* Title skeleton */}
                <div className="h-12 w-3/4 bg-gray-700 rounded animate-pulse"></div>
                {/* Overview skeleton */}
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-4 w-5/6 bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-4 w-4/6 bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-4 w-3/6 bg-gray-700 rounded animate-pulse"></div>
                </div>
                {/* Button skeleton */}
                <div className="h-10 w-32 bg-gray-700 rounded-md animate-pulse"></div>
              </div>
            </div>

            {/* Poster skeleton */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-end relative h-[300px] md:h-[500px]">
              <div className="relative w-[200px] md:w-[300px] h-[300px] md:h-[450px] bg-gray-700 rounded-lg overflow-hidden animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Navigation skeleton */}
        <div className="absolute bottom-8 left-0 right-0 z-30 px-8 md:px-16">
          <div className="flex items-center justify-between">
            <div className="flex space-x-4">
              <div className="h-10 w-10 rounded-full bg-gray-700/50 backdrop-blur-sm border border-gray-600/20 animate-pulse"></div>
              <div className="h-10 w-10 rounded-full bg-gray-700/50 backdrop-blur-sm border border-gray-600/20 animate-pulse"></div>
            </div>

            <div className="h-4 w-12 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </>
  );
};
