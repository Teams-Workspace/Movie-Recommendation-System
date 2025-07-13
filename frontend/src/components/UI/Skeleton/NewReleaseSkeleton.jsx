export const NewReleaseSkeleton = () => {
  return (
     <>
       <div className="container mx-auto px-4 mt-4">
      {/* Skeleton for "New Releases" heading */}
      <div className="mb-6">
        <div className="h-8 w-48 bg-gray-700 rounded animate-pulse"></div>
      </div>

      {/* Skeleton for the carousel */}
      <div className="relative group">
        {/* Skeleton for left arrow (hidden by default) */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 rounded-full w-10 h-10 -ml-5 opacity-0"></div>

        {/* Skeleton for right arrow (hidden by default) */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 rounded-full w-10 h-10 -mr-5 opacity-0"></div>

        {/* Skeleton for scrollable container */}
        <div className="flex overflow-x-hidden gap-4 pb-4">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="flex-shrink-0 w-[180px]">
              {/* Movie poster skeleton */}
              <div className="relative h-[270px] rounded-lg overflow-hidden bg-gray-700 animate-pulse"></div>
              
              {/* Movie info skeleton */}
              <div className="mt-2 space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-12 bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-3 w-8 bg-gray-700 rounded animate-pulse"></div>
                </div>
                <div className="h-4 w-full bg-gray-700 rounded animate-pulse"></div>
                <div className="h-3 w-24 bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
     </> 
  )
}

