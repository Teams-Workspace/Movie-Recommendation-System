import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import LoginForm from './LoginForm.jsx';

function Login() {
  const { login } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (username, password) => {
    if (login(username, password)) {
      navigate('/');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-dark to-light-gray">
      <div className="text-center">
        <LoginForm
          onLogin={handleLogin}
          error={error}
          initialUsername="username"
          initialPassword="password"
        />
        <p className="mt-4 text-dark">
          Don't have an account?{' '}
          <Link to="/signup" className="text-red-main hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;