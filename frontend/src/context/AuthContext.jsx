import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      getProfile();
    } else {
      localStorage.removeItem('token');
      setUser(null);
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');
      setToken(data.token);
      setUser(data.user);
      return true;
    } catch (err) {
      throw err;
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Signup failed');
      return true;
    } catch (err) {
      throw err;
    }
  };

  const verifyOTP = async (email, otp) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'OTP verification failed');
      return true;
    } catch (err) {
      throw err;
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Forgot password failed');
      return true;
    } catch (err) {
      throw err;
    }
  };

  const addToWatchlist = async (movieId) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/watchlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ movieId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to add to watchlist');
      return data;
    } catch (err) {
      throw err;
    }
  };

  const getWatchlist = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/watchlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch watchlist');
      return Array.isArray(data) ? data : [];
    } catch (err) {
      throw err;
    }
  };

  const removeFromWatchlist = async (movieId) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/watchlist`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ movieId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to remove from watchlist');
      return data;
    } catch (err) {
      throw err;
    }
  };

  const addToLikes = async (movieId) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/likes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ movieId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to add to likes');
      return data;
    } catch (err) {
      throw err;
    }
  };

  const getLikes = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/likes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 204) return [];
      const text = await response.text();
      //console.log('getLikes raw response:', text);
      if (!text) {
        console.error('getLikes: Empty response from server');
        return [];
      }
      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error('getLikes: Invalid JSON:', text);
        throw new Error('Invalid JSON response from server');
      }
      if (!response.ok) throw new Error(data.message || 'Failed to fetch likes');
      const likes = data.likes;
      if (!Array.isArray(likes)) {
        console.error('getLikes: data.likes is not an array:', likes);
        return [];
      }
      return likes; 
    } catch (err) {
      console.error('getLikes error:', err.message);
      throw err;
    }
  };

  const removeFromLikes = async (movieId) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/likes`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ movieId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to remove from likes');
      return data;
    } catch (err) {
      throw err;
    }
  };

  const getProfile = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch profile');
      setUser(data);
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const updateProfile = async ({ name, email, currentPassword, newPassword }) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/update-profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email, currentPassword, newPassword }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to update profile');
      setUser(data.user);
      return true;
    } catch (err) {
      throw err;
    }
  };

  const getRecommendations = async () => {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await fetch(`${BACKEND_URL}/api/auth/recommendations`, {
        headers,
      });
      const text = await response.text();
      if (!text) {
        console.error('getRecommendations: Empty response from server');
        throw new Error('Failed to fetch recommendations: Empty response');
      }
      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error('getRecommendations: Invalid JSON:', text);
        throw new Error('Failed to fetch recommendations: Invalid JSON response');
      }
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch recommendations');
      }
      if (!Array.isArray(data)) {
        console.error('getRecommendations: Data is not an array:', data);
        throw new Error('Failed to fetch recommendations: Invalid data format');
      }
      return data.slice(0, 6); // Ensure max 6 movies
    } catch (err) {
      console.error('getRecommendations error:', err.message);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        signup,
        verifyOTP,
        forgotPassword,
        addToWatchlist,
        getWatchlist,
        removeFromWatchlist,
        addToLikes,
        getLikes,
        removeFromLikes,
        getProfile,
        updateProfile,
        getRecommendations,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}