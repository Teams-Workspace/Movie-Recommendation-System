import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

const initialState = {
  watchlist: [],
  loading: false,
  error: null,
};

// Get user's watchlist
export const fetchWatchlist = createAsyncThunk(
  "watchlist/fetchWatchlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/watchlist");
      return response.data.movieIds || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch watchlist"
      );
    }
  }
);

// Add a movie to watchlist
export const addToWatchlist = createAsyncThunk(
  "watchlist/addToWatchlist",
  async (movieId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/watchlist", { movieId: movieId.toString() });
      return response.data.movieIds;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add to watchlist"
      );
    }
  }
);

// Remove a movie from watchlist
export const removeFromWatchlist = createAsyncThunk(
  "watchlist/removeFromWatchlist",
  async (movieId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/api/watchlist", { movieId: movieId.toString() });
      return response.data.movieIds;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove from watchlist"
      );
    }
  }
);

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  extraReducers: (builder) => {
    builder
      // Fetch Watchlist
      .addCase(fetchWatchlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWatchlist.fulfilled, (state, action) => {
        state.loading = false;
        state.watchlist = action.payload.map(id => id.toString());
      })
      .addCase(fetchWatchlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add to Watchlist
      .addCase(addToWatchlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWatchlist.fulfilled, (state, action) => {
        state.loading = false;
        state.watchlist = action.payload.map(id => id.toString());
      })
      .addCase(addToWatchlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Remove from Watchlist
      .addCase(removeFromWatchlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromWatchlist.fulfilled, (state, action) => {
        state.loading = false;
        state.watchlist = action.payload.map(id => id.toString());
      })
      .addCase(removeFromWatchlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default watchlistSlice.reducer;