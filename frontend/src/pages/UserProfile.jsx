import { useState, useEffect } from "react";
import {  NavLink, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSave, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../features/auth/authSlice";
import { getPasswordStrength, validateProfile } from "../utils/ResuablePart";
import Spinner from "../components/UI/Spinner";
import toast from "react-hot-toast";


export const UserProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Inside your component:
const navigate = useNavigate();


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // ✅ Pre-fill form with user info
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error and success
  };

  // ✅ Password strength meter

  const passwordStrength = getPasswordStrength(formData.newPassword);

  const handleSubmit = async (e) => {
  e.preventDefault();

  const isValid = validateProfile(formData);
  if (!isValid) return;

  setIsLoading(true);

  try {
    const action = await dispatch(updateProfile(formData));
    setIsLoading(false);

    if (updateProfile.fulfilled.match(action)) {
      toast.success("Profile updated successfully!", {
        position: "top-right",
      });

      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } else {
      // Show backend error via toast
      const message =
        action.payload?.message || action.payload || "Profile update failed";
      toast.error(message, { position: "top-right" });
    }
  } catch (err) {
    console.error(err);
    setIsLoading(false);
    toast.error("Something went wrong", { position: "top-right" });
  }
};


  return (
    <div className="min-h-screen bg-dark flex flex-col md:flex-row ">
      <div className="flex-1 flex flex-col justify-center px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-6">
            <NavLink
              onClick={() => navigate(-1)}
              className="flex items-center text-sm text-gray-400 hover:text-red-500"
            >
              <FaArrowLeft className="mr-2 h-4 w-4" />
              Go to Back
            </NavLink>
          </div>

          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="h-20 w-20 rounded-full bg-gray-800 flex items-center justify-center">
                <FaUserCircle className="h-10 w-10 text-gray-400" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white">Your Profile</h2>
            <p className="mt-2 text-gray-400">Update your info and password</p>
          </div>

          

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-900 text-white border border-gray-700
                 rounded-md shadow-sm placeholder-gray-400 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-900 text-white border border-gray-700
                 rounded-md shadow-sm placeholder-gray-400 focus:outline-none"
              />
            </div>

            {/* Password Change Section */}
            <div className="border-t border-gray-800 pt-6">
              <h3 className="text-lg font-medium text-white mb-4">
                Change Password
              </h3>

              {/* Current */}
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Current Password
                </label>
                <input
                  name="currentPassword"
                  type="password"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-gray-900 text-white border border-gray-700
                 rounded-md shadow-sm placeholder-gray-400 focus:outline-none"
                  placeholder="••••••••"
                />
              </div>

              {/* New */}
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  New Password
                </label>
                <input
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-gray-900 text-white border border-gray-700
                 rounded-md shadow-sm placeholder-gray-400 focus:outline-none"
                  placeholder="••••••••"
                />

                {/* Strength Bar */}
                {formData.newPassword && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Password strength:</span>
                      <span
                        className={`${
                          passwordStrength.strength === 1
                            ? "text-red-500"
                            : passwordStrength.strength === 2
                            ? "text-yellow-500"
                            : "text-green-500"
                        }`}
                      >
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          passwordStrength.strength === 1
                            ? "bg-red-500 w-1/3"
                            : passwordStrength.strength === 2
                            ? "bg-yellow-500 w-2/3"
                            : "bg-green-500 w-full"
                        }`}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm */}
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Confirm New Password
                </label>
                <input
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-gray-900 text-white border border-gray-700
                 rounded-md shadow-sm placeholder-gray-400 focus:outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-2 px-4 rounded-md text-sm font-medium text-white bg-red-main hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              {isLoading ? (
                <Spinner/>
              ) : (
                <>
                  <FaSave className="mr-2" /> Save changes
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Right-side Image */}
      <div className="hidden md:block md:flex-1 relative">
        <img
          src="https://image.tmdb.org/t/p/w1920/qdKGpTHVaaKaFTnRynQDg4qHdEv.jpg"
          alt="Movie scene"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold text-white mb-4">
              Manage your account
            </h2>
            <p className="text-xl text-gray-300">
              Update your profile information and keep your account secure with
              a strong password.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
