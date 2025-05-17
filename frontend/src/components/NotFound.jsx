import { useNavigate } from 'react-router-dom';
import FuzzyText from './FuzzyText/FuzzyText';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 md:px-8">
      <div className="text-center space-y-6">

        <h1 className="text-4xl md:text-5xl font-bold text-white-custom"><FuzzyText baseIntensity={0.2}>404</FuzzyText></h1>
        <p className="text-lg text-gray-400 max-w-md mx-auto">
          Sorry, the page you're looking for doesn't exist. Let's get you back to the action!
        </p>
        <button
          className="bg-red-main hover:bg-red-main/90 text-white-custom px-6 py-3 rounded-md text-lg font-medium"
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default NotFound;