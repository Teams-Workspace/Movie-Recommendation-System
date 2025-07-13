// src/features/likes/likeSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

const initialState = {
  likedMovies: [],
  loading: false,
  error: null,
};

// Get user's liked movies
export const fetchLikes = createAsyncThunk(
  "likes/fetchLikes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/likes");
      return response.data.movieIds || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch liked movies"
      );
    }
  }
);

// Add a movie to likes
export const addLike = createAsyncThunk(
  "likes/addLike",
  async (movieId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/likes", { movieId: movieId.toString() });
      return response.data.movieIds;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add like"
      );
    }
  }
);

// Remove a movie from likes
export const removeLike = createAsyncThunk(
  "likes/removeLike",
  async (movieId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/api/likes", { movieId: movieId.toString() });
      return response.data.movieIds;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove like"
      );
    }
  }
);

const likeSlice = createSlice({
  name: "likes",
  initialState,
  extraReducers: (builder) => {
    builder
      // Fetch Likes
      .addCase(fetchLikes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLikes.fulfilled, (state, action) => {
        state.loading = false;
        state.likedMovies = action.payload.map(id => id.toString()); // Ensure string IDs
      })
      .addCase(fetchLikes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Like
      .addCase(addLike.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addLike.fulfilled, (state, action) => {
        state.loading = false;
        state.likedMovies = action.payload.map(id => id.toString());
      })
      .addCase(addLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Remove Like
      .addCase(removeLike.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeLike.fulfilled, (state, action) => {
        state.loading = false;
        state.likedMovies = action.payload.map(id => id.toString());
      })
      .addCase(removeLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default likeSlice.reducer;