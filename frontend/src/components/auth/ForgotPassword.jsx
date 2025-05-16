import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const { forgotPassword } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      await forgotPassword(email);
      setIsSubmitted(true);
    } catch (error) {
      setError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row">
      <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8">
            <Link to="/login" className="flex items-center text-sm text-gray-400 hover:text-red-500">
              ← Back to login
            </Link>
          </div>
          {!isSubmitted ? (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white">Forgot your password?</h2>
                <p className="mt-2 text-gray-400">
                  Enter your email address and we'll send you a verification code to reset your password.
                </p>
              </div>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`appearance-none block w-full px-3 py-2 border ${
                        error ? 'border-red-500' : 'border-gray-700'
                      } rounded-md shadow-sm bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-red-600 focus:border-red-600`}
                      placeholder="you@gmail.com"
                    />
                    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Sending...' : 'Send verification code'}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-white mb-2">Check your email</h3>
              <p className="text-gray-400 mb-6">
                We've sent a verification code to <span className="font-medium text-white">{email}</span>
              </p>
              <button
                onClick={() => navigate('/otp', { state: { email, isForgotPassword: true } })}
                className="cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
              >
                Enter verification code
              </button>
              <p className="mt-4 text-sm text-gray-400">
                Didn't receive the email?{' '}
                <button
                  type="button"
                  className="cursor-pointer text-red-600 hover:text-red-500"
                  onClick={() => setIsSubmitted(false)}
                >
                  Click to resend
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="hidden md:block md:flex-1 relative">
        <img
          src="https://image.tmdb.org/t/p/w1280/yRKyJJYIzfeiVDHBe4LXguPQCvD.jpg"
          alt="Movie scene"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold text-white mb-4">No worries, we've got you covered</h2>
            <p className="text-xl text-gray-300">Reset your password and get back to watching your favorite movies.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;