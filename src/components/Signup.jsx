import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import SignupForm from './SignupForm.jsx';

function Signup() {
  const { signup } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = (username, password) => {
    if (signup(username, password)) {
      navigate('/');
    } else {
      setError('Username already exists');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-dark to-light-gray">
      <div className="text-center">
        <SignupForm
          onSignup={handleSignup}
          error={error}
          initialUsername="user1"
          initialPassword="pass123"
        />
        <p className="mt-4 text-dark">
          Already have an account?{' '}
          <Link to="/login" className="text-red-main hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;