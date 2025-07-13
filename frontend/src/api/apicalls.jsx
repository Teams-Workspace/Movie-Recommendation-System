import axios from "axios";
import axiosInstance from "./axiosInstance";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

// Search functionality api call

export const searchData = (query) => {
  return api.get(`/search/movie`, {
    params: {
      api_key: API_KEY,
      query: query,
    },
  });
};

// Movie Coursel section 1st
export const movieCarousel = () => {
  return api.get(`/movie/popular`, {
    params: {
      api_key: API_KEY,
      page: 1,
    },
  });
};

// New Release section 2st
export const newRelease = () => {
  return api.get(`/movie/popular`, {
    params: {
      api_key: API_KEY,
      page: 2,
    },
  });
};

// Trending Now section 3st
export const trendingCarousel = () => {
  return api.get(`/movie/popular`, {
    params: {
      api_key: API_KEY,
      page: 3,
    },
  });
};

//Top Rated  section 3st
export const topRated = () => {
  return api.get(`/movie/top_rated`, {
    params: {
      api_key: API_KEY,
      page: 1,
    },
  });
};

//Like Movies  Gets
// New function to fetch movie details by IDs
export const getMoviesByIds = async (movieIds) => {
  if (!movieIds || movieIds.length === 0) return [];

  try {
    const promises = movieIds.map((movieId) =>
      axiosInstance.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
        params: { api_key: API_KEY },
      })
    );
    const responses = await Promise.all(promises);
    return responses.map((res) => res.data);
  } catch (error) {
    console.error("Error fetching movie details by IDs:", error);
    throw error;
  }
};

const BASE_URL =  "https://api.themoviedb.org/3"



export const getMovieDetails = async (id) => {
  try {
    const params = {
      api_key: import.meta.env.VITE_TMDB_API_KEY,
      language: "en-US",
    };

    // Make parallel requests for all needed data
    const [details, credits, similar] = await Promise.all([
      axios.get(`${BASE_URL}/movie/${id}`, { params }),
      axios.get(`${BASE_URL}/movie/${id}/credits`, { params }),
      axios.get(`${BASE_URL}/movie/${id}/similar`, { 
        params: { ...params, page: 1 } 
      }),
    ]);

    return {
      ...details.data,
      credits: credits.data,
      similar: similar.data,
    };
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw new Error(
      error.response?.data?.status_message || "Failed to fetch movie details"
    );
  }
};