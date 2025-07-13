export const MovieDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white animate-pulse">
      {/* Backdrop Image Placeholder */}
      <div className="relative h-96 w-full bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-20 w-20 rounded-full bg-gray-700/50 border-4 border-gray-600 flex items-center justify-center">
            {/* <Play className="h-10 w-10 text-gray-600" /> */}
          </div>
        </div>
      </div>

      {/* Movie Content */}
      <div className="container mx-auto px-4 relative -mt-16">
        {/* Poster and Basic Info */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster Placeholder */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="aspect-[2/3] rounded-lg bg-gray-800 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-16 w-16 text-gray-700">
                  {/* <Play className="h-full w-full" /> */}
                </div>
              </div>
            </div>
          </div>

          {/* Movie Info */}
          <div className="w-full md:w-2/3 lg:w-3/4 space-y-6">
            {/* Title */}
            <div>
              <div className="h-10 w-3/4 bg-gray-800 rounded mb-2"></div>
              <div className="h-4 w-1/2 bg-gray-800 rounded"></div>
            </div>

            {/* Rating and Metadata */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <div className="h-5 w-5 bg-gray-800 rounded-full"></div>
                <div className="h-4 w-12 bg-gray-800 rounded"></div>
              </div>
              <div className="flex items-center space-x-2">
                {/* <Clock className="h-5 w-5 text-gray-400" /> */}
                <div className="h-4 w-16 bg-gray-800 rounded"></div>
              </div>
              <div className="h-4 w-20 bg-gray-800 rounded"></div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <div className="h-10 w-32 bg-gray-800 rounded-full"></div>
              <div className="h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center">
                {/* <Heart className="h-5 w-5 text-gray-400" /> */}
              </div>
              <div className="h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center">
                {/* <Bookmark className="h-5 w-5 text-gray-400" /> */}
              </div>
              <div className="h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center">
                {/* <Share2 className="h-5 w-5 text-gray-400" /> */}
              </div>
            </div>

            {/* Overview */}
            <div className="space-y-3">
              <div className="h-4 w-24 bg-gray-800 rounded"></div>
              <div className="h-3 w-full bg-gray-800 rounded"></div>
              <div className="h-3 w-5/6 bg-gray-800 rounded"></div>
              <div className="h-3 w-4/5 bg-gray-800 rounded"></div>
              <div className="h-3 w-3/4 bg-gray-800 rounded"></div>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-6 w-16 bg-gray-800 rounded-full"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Sections */}
        <div className="mt-12 space-y-8">
          {/* Cast Section */}
          <div>
            <div className="h-6 w-32 bg-gray-800 rounded mb-4"></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="aspect-square rounded-full bg-gray-800 mx-auto"></div>
                  <div className="h-3 w-3/4 bg-gray-800 rounded mx-auto"></div>
                  <div className="h-3 w-1/2 bg-gray-800 rounded mx-auto"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Similar Movies */}
          <div>
            <div className="h-6 w-40 bg-gray-800 rounded mb-4"></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="aspect-[2/3] rounded-lg bg-gray-800"></div>
                  <div className="h-4 w-3/4 bg-gray-800 rounded"></div>
                  <div className="flex items-center">
                    {/* <Star className="h-3 w-3 text-yellow-400 mr-1" /> */}
                    <div className="h-3 w-6 bg-gray-800 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};