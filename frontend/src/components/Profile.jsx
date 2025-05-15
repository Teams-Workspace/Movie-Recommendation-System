import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaArrowLeft, FaEye, FaEyeSlash, FaSave, FaUserCircle } from 'react-icons/fa';
import SiteFooter from './SiteFooter';

function Profile() {
  const { user, updateProfile, getProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        setFormData((prev) => ({
          ...prev,
          name: user.name || '',
          email: user.email || '',
        }));
      } else {
        const profile = await getProfile();
        if (profile) {
          setFormData((prev) => ({
            ...prev,
            name: profile.name || '',
            email: profile.email || '',
          }));
        }
      }
    };
    fetchUserData();
  }, [user, getProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (successMessage) {
      setSuccessMessage('');
    }
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (formData.currentPassword || formData.newPassword || formData.confirmPassword) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = 'Current password is required to change password';
      }
      if (formData.newPassword && formData.newPassword.length < 8) {
        newErrors.newPassword = 'Password must be at least 8 characters';
      }
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await updateProfile({
        name: formData.name,
        email: formData.email,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
      setSuccessMessage('Profile updated successfully');
      setFormData((prev) => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
      navigate('/'); // Redirect to home after successful update
    } catch (error) {
      setErrors({ currentPassword: error.message || 'Failed to update profile' });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = () => {
    const { newPassword } = formData;
    if (!newPassword) return { strength: 0, label: '' };
    if (newPassword.length < 8) return { strength: 1, label: 'Weak' };
    if (newPassword.length < 12) return { strength: 2, label: 'Medium' };
    return { strength: 3, label: 'Strong' };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <>
    <div className="min-h-screen bg-dark flex flex-col md:flex-row">
      <div className="flex-1 flex flex-col justify-center px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8">
            <Link to="/" className="flex items-center text-sm text-gray-400 hover:text-red-500">
              <FaArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </div>

          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative h-20 w-20 rounded-full bg-gray-800 flex items-center justify-center">
                <FaUserCircle className="h-10 w-10 text-gray-400" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white">Your Profile</h2>
            <p className="mt-2 text-gray-400">Update your personal information and password</p>
          </div>

          {successMessage && (
            <div className="mb-6 p-3 bg-green-900/50 border border-green-700 rounded-md text-green-400 text-center">
              {successMessage}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.name ? 'border-red-500' : 'border-gray-700'
                  } rounded-md shadow-sm bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-text-red-main focus:border-red-500`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>
            </div>

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
                  value={formData.email}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.email ? 'border-red-500' : 'border-gray-700'
                  } rounded-md shadow-sm bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-text-red-main focus:border-red-500`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>
            </div>

            <div className="border-t border-gray-800 pt-6">
              <h3 className="text-lg font-medium text-white mb-4">Change Password</h3>

              <div className="space-y-4">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300">
                    Current Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="currentPassword"
                      name="currentPassword"
                      type={showPassword.current ? 'text' : 'password'}
                      value={formData.currentPassword}
                      onChange={handleChange}
                      className={`appearance-none block w-full px-3 py-2 border ${
                        errors.currentPassword ? 'border-red-500' : 'border-gray-700'
                      } rounded-md shadow-sm bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-text-red-main focus:border-red-500 pr-10`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                      onClick={() => setShowPassword((prev) => ({ ...prev, current: !prev.current }))}
                    >
                      {showPassword.current ? (
                        <FaEyeSlash className="h-5 w-5" />
                      ) : (
                        <FaEye className="h-5 w-5" />
                      )}
                    </button>
                    {errors.currentPassword && <p className="mt-1 text-sm text-red-500">{errors.currentPassword}</p>}
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
                      type={showPassword.new ? 'text' : 'password'}
                      value={formData.newPassword}
                      onChange={handleChange}
                      className={`appearance-none block w-full px-3 py-2 border ${
                        errors.newPassword ? 'border-red-500' : 'border-gray-700'
                      } rounded-md shadow-sm bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-text-red-main focus:border-red-500 pr-10`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                      onClick={() => setShowPassword((prev) => ({ ...prev, new: !prev.new }))}
                    >
                      {showPassword.new ? (
                        <FaEyeSlash className="h-5 w-5" />
                      ) : (
                        <FaEye className="h-5 w-5" />
                      )}
                    </button>
                    {errors.newPassword && <p className="mt-1 text-sm text-red-500">{errors.newPassword}</p>}
                  </div>

                  {formData.newPassword && (
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
                    Confirm New Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword.confirm ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`appearance-none block w-full px-3 py-2 border ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-700'
                      } rounded-md shadow-sm bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-text-red-main focus:border-red-500 pr-10`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                      onClick={() => setShowPassword((prev) => ({ ...prev, confirm: !prev.confirm }))}
                    >
                      {showPassword.confirm ? (
                        <FaEyeSlash className="h-5 w-5" />
                      ) : (
                        <FaEye className="h-5 w-5" />
                      )}
                    </button>
                    {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-text-red-main/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                disabled={isLoading}
              >
                {isLoading ? (
                  'Saving changes...'
                ) : (
                  <>
                    <FaSave className="w-4 h-4 mr-2" />
                    Save changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden md:block md:flex-1 relative">
        <img
          src="https://image.tmdb.org/t/p/w1920/qdKGpTHVaaKaFTnRynQDg4qHdEv.jpg"
          alt="Movie scene"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold text-white mb-4">Manage your account</h2>
            <p className="text-xl text-gray-300">
              Update your profile information and keep your account secure with a strong password.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="relative w-full">
      <SiteFooter />
    </div>
    </>
  );
}

export default Profile;