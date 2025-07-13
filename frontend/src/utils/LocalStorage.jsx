// src/utils/LocalStorage.js
const ACCESS_TOKEN = 'accessToken';  // Key for token

export const localStorageService = {
  // Token-specific methods
  getToken: () => {
    try {
      return localStorage.getItem(ACCESS_TOKEN);
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  setToken: (token) => {
    try {
      localStorage.setItem(ACCESS_TOKEN, token);
    } catch (error) {
      console.error('Error setting token:', error);
    }
  },

  removeToken: () => {
    try {
      localStorage.removeItem(ACCESS_TOKEN);
    } catch (error) {
      console.error('Error removing token:', error);
    }
  },

  // Generic methods (optional)
  getItem: (key) => localStorage.getItem(key),
  setItem: (key, value) => localStorage.setItem(key, value),
  removeItem: (key) => localStorage.removeItem(key),
};