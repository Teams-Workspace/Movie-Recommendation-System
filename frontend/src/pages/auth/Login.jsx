import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../features/auth/authSlice";
import Spinner from "../../components/UI/Spinner";
import { validateLogin } from "../../utils/ResuablePart";
import toast from "react-hot-toast";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  const isValid = validateLogin({ email, password });
  if (!isValid) return;

  setIsLoading(true);

  const action = await dispatch(login({ email, password }));

  setIsLoading(false);

  if (login.fulfilled.match(action)) {
    localStorage.setItem("accessToken", action.payload.token);
    navigate("/");
  } else {
    toast.error(action.payload?.message || action.payload || "User not found", {
      position: "top-right",
    });
  }
};


  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row">
      <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-sm">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">Welcome back</h2>
            <p className="mt-2 text-gray-400">
              Sign in to your account to continue
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='appearance-none block w-full px-3 py-2 border border-gray-700
                   rounded-md shadow-sm bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-red-600 focus:border-red-600'
                  placeholder="email@address.com"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='appearance-none block w-full px-3 py-2 border border-gray-700
                   rounded-md shadow-sm bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-red-600 focus:border-red-600'
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-main hover:bg-red-main focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : "Sign in"}
              </button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-red-main hover:text-red-main/90"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden md:block md:flex-1 relative">
        <img
          src="https://image.tmdb.org/t/p/w1920/yRKyJJYIzfeiVDHBe4LXguPQCvD.jpg"
          alt="Movie poster collage"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold text-white mb-4">
              Unlimited movies, TV shows, and more.
            </h2>
            <p className="text-xl text-gray-300">
              Watch anywhere. Cancel anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
