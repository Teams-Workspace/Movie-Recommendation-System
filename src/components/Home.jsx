import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <>
    <div className="min-h-screen bg-light-gray flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4 text-dark">
        Welcome to the Movie Recommendation System
      </h1>
      {user ? (
        <p className="text-lg text-dark">
          Hello, {user.username}! Start exploring movies now.
        </p>
      ) : (
        <p className="text-lg text-dark">
          Please log in to get personalized movie recommendations.
        </p>
      )}
    </div>
    <div className="min-h-screen bg-light-gray flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4 text-dark">
        Welcome to the Movie Recommendation System
      </h1>
      {user ? (
        <p className="text-lg text-dark">
          Hello, {user.username}! Start exploring movies now.
        </p>
      ) : (
        <p className="text-lg text-dark">
          Please log in to get personalized movie recommendations.
        </p>
      )}
    </div>
    </>
    
  );
}

export default Home;