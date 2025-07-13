import { NavLink, useNavigate } from "react-router-dom";
import { FiFilm, FiHome } from "react-icons/fi";
import { IoArrowBackSharp } from "react-icons/io5";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 text-white-custom flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md w-full space-y-6">
        {/* 404 Text with Film Icon */}
        <div className="flex items-center justify-center space-x-4">
          <FiFilm className="h-16 w-16 text-red-main" />
          <h1 className="text-6xl font-bold text-light-white">404</h1>
        </div>
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-light-white">Page Not Found</h2>
        
        {/* Description */}
        <p className="text-gray-400">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        {/* Movie-themed graphic */}
        
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <NavLink
            onClick={() => navigate("/")}
            className="cursor-pointer flex items-center justify-center gap-2 bg-red-main hover:bg-red-main/90 text-white px-6 py-3 rounded-md transition-colors"
          >
            <FiHome className="h-5 w-5" />
            Return Home
          </NavLink>
          <NavLink
            onClick={() => navigate(-1)}
            className="cursor-pointer flex items-center justify-center gap-2 border border-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-md transition-colors"
          >
            <IoArrowBackSharp className="h-5 w-5" />
            Go to Back
          </NavLink>
        </div>
        
        {/* Footer Note */}
        <p className="text-xs text-gray-600 mt-8">
          If you believe this is an error, please contact support.
        </p>
      </div>
    </div>
  );
};