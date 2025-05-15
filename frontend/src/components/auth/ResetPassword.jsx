import { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function ResetPassword() {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { resetPassword } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  const validateForm = () => {
    const newErrors = {};
    if (!otp) newErrors.otp = 'OTP is required';
    else if (otp.length !== 6 || !/^\d+$/.test(otp)) newErrors.otp = 'OTP must be a 6-digit number';
    if (!newPassword) newErrors.newPassword = 'New password is required';
    else if (newPassword.length < 8) newErrors.newPassword = 'Password must be at least 8 characters';
    if (newPassword !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await resetPassword(email, otp, newPassword);
      navigate('/login');
    } catch (error) {
      setErrors({ otp: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = () => {
    if (!newPassword) return { strength: 0, label: '' };
    if (newPassword.length < 8) return { strength: 1, label: 'Weak' };
    if (newPassword.length < 12) return { strength: 2, label: 'Medium' };
    return { strength: 3, label: 'Strong' };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row">
      <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8">
            <Link to="/forgot-password" className="flex items-center text-sm text-gray-400 hover:text-white">
              ← Back
            </Link>
          </div>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">Reset your password</h2>
            <p className="mt-2 text-gray-400">
              Enter the OTP and your new password to reset your account.
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-300">
                Verification Code
              </label>
              <div className="mt-1">
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  maxLength={6}
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.otp ? 'border-red-500' : 'border-gray-700'
                  } rounded-md shadow-sm bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:border-blue-600`}
                  placeholder="123456"
                />
                {errors.otp && <p className="mt-1 text-sm text-red-500">{errors.otp}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300">
                New Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="newPassword"
                  name="newPassword"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.newPassword ? 'border-red-500' : 'border-gray-700'
                  } rounded-md shadow-sm bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:border-blue-600 pr-10`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
                {errors.newPassword && <p className="mt-1 text-sm text-red-500">{errors.newPassword}</p>}
              </div>
              {newPassword && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-xs text-gray-400">Password strength:</div>
                    <div
                      className={`text-xs font-medium ${
                        passwordStrength.strength === 1
                          ? 'text-red-500'
                          : passwordStrength.strength === 2
                            ? 'text-yellow-500'
                            : 'text-green-500'
                      }`}
                    >
                      {passwordStrength.label}
                    </div>
                  </div>
                  <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        passwordStrength.strength === 1
                          ? 'bg-red-500 w-1/3'
                          : passwordStrength.strength === 2
                            ? 'bg-yellow-500 w-2/3'
                            : 'bg-green-500 w-full'
                      }`}
                    ></div>
                  </div>
                </div>
              )}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-700'
                  } rounded-md shadow-sm bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:border-blue-600`}
                  placeholder="••••••••"
                />
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                disabled={isLoading}
              >
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Remember your password?{' '}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden md:block md:flex-1 relative">
        <img
          src="https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/avU3JDR6gH5S7Cz40W6d1j3M5u.jpg"
          alt="Movie scene"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold text-white mb-4">Secure your account</h2>
            <p className="text-xl text-gray-300">Set a new password to continue enjoying your favorite movies.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;