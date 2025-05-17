import { useState, useEffect } from 'react';

function Preloader({ onLoadingComplete, minimumDisplayTime = 2500 }) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const startTime = Date.now();
    let progressInterval;

    // Simulate loading progress
    progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        const newProgress = prev + (100 - prev) * 0.1;
        return Math.min(newProgress, 99); // Cap at 99% until complete
      });
    }, 100);

    // Complete loading after minimum display time
    const timer = setTimeout(() => {
      setLoadingProgress(100);

      // Ensure minimum display time has passed
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minimumDisplayTime - elapsedTime);

      setTimeout(() => {
        setShowSplash(false);
        setTimeout(onLoadingComplete, 500); // Call callback after exit animation
      }, remainingTime);

      clearInterval(progressInterval);
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [onLoadingComplete, minimumDisplayTime]);

  if (!showSplash) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark transition-opacity duration-500 ${
        loadingProgress >= 100 ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative w-full max-w-md px-4 text-center">
        {/* Logo with animation */}
        <div
          className="mb-8 transform transition-transform duration-1000 ease-out"
          style={{
            transform: `scale(${0.8 + loadingProgress / 500})`,
          }}
        >
          <img
            src="/Logo.png"
            alt="MRS Logo"
            className="mx-auto"
            style={{ width: '400px', height: '200px' }}
          />
        </div>

        {/* Tagline with fade-in */}
        <div
          className="mb-12 text-white-custom text-xl opacity-0 transition-opacity duration-1000"
          style={{ opacity: loadingProgress > 30 ? 1 : 0 }}
        >
          Your Ultimate Movie Experience
        </div>

        {/* Loading bar */}
        <div className="w-full h-1 bg-light-gray rounded-full overflow-hidden">
          <div
            className="h-full bg-red-main transition-all duration-300 ease-out"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>

        {/* Loading text */}
        <div className="mt-4 text-gray-400 text-sm">
          {loadingProgress < 100 ? 'Loading amazing content...' : 'Ready!'}
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-red-main/10 rounded-full"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.1 + Math.random() * 0.2,
              transform: `scale(${0.5 + loadingProgress / 100})`,
              transition: 'transform 1.5s ease-out',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Preloader;