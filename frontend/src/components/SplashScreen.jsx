import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const duration = 3000; // 3 seconds total
    const interval = 30; // Update every 30ms
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newValue = Math.min(prev + increment, 100);
        if (newValue >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete(); // Call completion handler instead of navigating directly
          }, 100);
        }
        return newValue;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]); // Removed navigate from dependencies

  return (
    <div className="fixed inset-0 z-50 bg-black-dark">
      <div className="absolute top-6 right-6">
        <div className="text-red-500 font-mono text-2xl font-bold">
          {Math.floor(progress)}%
        </div>
      </div>
      <div className="flex items-center justify-center h-full">
        {/* Optional content */}
      </div>
    </div>
  );
};