// src/api/axiosInstance.js
import axios from 'axios';
import { localStorageService } from '../utils/LocalStorage';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Add Authorization token from localStorage
axiosInstance.interceptors.request.use((config) => {
  const token = localStorageService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
