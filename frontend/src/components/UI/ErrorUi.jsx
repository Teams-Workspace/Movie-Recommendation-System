// Error Page Component
export const ErrorUi = ({ error, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-4 text-center">
      <h2 className="text-3xl font-bold mb-4">Oops! Something went wrong</h2>
      <p className="text-xl mb-6">{error?.message || "Failed to load movies"}</p>
      <button
        onClick={onRetry}
        className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-md transition-colors"
      >
        Try Again
      </button>
    </div>
  );
};