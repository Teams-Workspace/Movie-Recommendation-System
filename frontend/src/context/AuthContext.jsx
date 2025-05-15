import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      // Fetch user profile on token change
      getProfile();
    } else {
      localStorage.removeItem('token');
      setUser(null);
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setToken(data.token);
      setUser(data.user); // { name, email }
      return true;
    } catch (err) {
      throw err;
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return true;
    } catch (err) {
      throw err;
    }
  };

  const verifyOTP = async (email, otp) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return true;
    } catch (err) {
      throw err;
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return true;
    } catch (err) {
      throw err;
    }
  };

  const resetPassword = async (email, otp, newPassword) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return true;
    } catch (err) {
      throw err;
    }
  };

  const addToWatchlist = async (movieId) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/watchlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ movieId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return true;
    } catch (err) {
      throw err;
    }
  };

  const getWatchlist = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/watchlist', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data.watchlist;
    } catch (err) {
      throw err;
    }
  };

  const addToLikes = async (movieId) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ movieId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return true;
    } catch (err) {
      throw err;
    }
  };

  const getLikes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/likes', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data.likes;
    } catch (err) {
      throw err;
    }
  };

  const getProfile = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setUser(data);
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const updateProfile = async ({ name, email, currentPassword, newPassword }) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email, currentPassword, newPassword }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setUser(data.user); // Update user with new name/email
      return true;
    } catch (err) {
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
        resetPassword,
        addToWatchlist,
        getWatchlist,
        addToLikes,
        getLikes,
        getProfile,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}