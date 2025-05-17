import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route , Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import Home from './components/Home.jsx';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import OTP from './components/auth/OTP';
import ForgotPassword from './components/auth/ForgotPassword';
import Watchlist from './components/Watchlist';
import Likes from './components/Likes';
import Profile from './components/Profile';
import SearchPage from './components/SearchPage';
import Preloader from './components/Preloader';

function App() {

  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };


  return (
    <AuthProvider>
      {isLoading ? (
        <Preloader onLoadingComplete={handleLoadingComplete} />
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
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
      )}
    </AuthProvider>
  );
}

export default App;