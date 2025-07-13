import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../features/auth/authSlice';
import { getPasswordStrength, validateRegister } from '../../utils/ResuablePart';
import Spinner from '../../components/UI/Spinner';
import { toast } from "react-hot-toast";


export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateRegister({ name, email, password });
    if (!isValid) return;

    setIsLoading(true);

    const action = await dispatch(register({ email, name, password }));

    setIsLoading(false);

    if (register.fulfilled.match(action)) {
      localStorage.setItem('accessToken', action.payload.token);
      navigate('/');
    } else {
      toast.error(action.payload || 'Registration failed', { position: 'top-right' });
    }
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row">
      <div className="hidden md:block md:flex-1 relative">
        <img
          src="https://image.tmdb.org/t/p/w1280/yRKyJJYIzfeiVDHBe4LXguPQCvD.jpg"
          alt="Movie scene"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold text-white mb-4">Join our movie community today</h2>
            <p className="text-xl text-gray-300">Get personalized recommendations and track your favorites.</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-sm">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">Create your account</h2>
            <p className="mt-2 text-gray-400">Sign up to get started with our platform</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
              <div className="mt-1">
                <input
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-red-600 focus:border-red-600"
                  placeholder="name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email address</label>
              <div className="mt-1">
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-red-600 focus:border-red-600"
                  placeholder="you@gmail.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
              <div className="mt-1 relative">
                <input
                  name="password"
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-red-600 focus:border-red-600 pr-10"
                  placeholder="••••••••"
                />
              </div>

              {password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-xs text-gray-400">Password strength:</div>
                    <div className={`text-xs font-medium ${
                      passwordStrength.strength === 1
                        ? 'text-red-500'
                        : passwordStrength.strength === 2
                          ? 'text-yellow-500'
                          : 'text-green-500'
                    }`}>
                      {passwordStrength.label}
                    </div>
                  </div>
                  <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                    <div className={`h-full ${
                      passwordStrength.strength === 1
                        ? 'bg-red-500 w-1/3'
                        : passwordStrength.strength === 2
                          ? 'bg-yellow-500 w-2/3'
                          : 'bg-green-500 w-full'
                    }`}></div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-main hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : 'Create account'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-red-600 hover:text-red-500">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
