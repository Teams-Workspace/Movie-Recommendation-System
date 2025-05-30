import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import Home from './components/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import OTP from './components/auth/OTP';
import ForgotPassword from './components/auth/ForgotPassword';
import Watchlist from './components/UserData/Watchlist';
import Likes from './components/UserData/Likes';
import Profile from './components/UserData/Profile';
import SearchPage from './components/SearchPage/SearchPage';
import MovieDetail from './components/SearchPage/MovieDetail';
import NotFound from './components/NotFound';
import SplashScreen from './components/SplashScreen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
    <div>
      {/* Your app components */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{ zIndex: 9999 }} // Ensure the toast is above other elements
        limit={3} // Limit the number of toasts
      />
    </div>
    <AuthProvider>
      {isLoading ? (
        <SplashScreen onLoadingComplete={handleLoadingComplete} />
      ) : (
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/otp" element={<OTP />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/likes" element={<Likes />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/movie/:id" element={<MovieDetail />} /> {/* MovieDetail page route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      )}
    </AuthProvider>
    </>
  );
}

export default App;