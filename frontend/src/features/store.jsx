import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth/authSlice';
import watchlistReducer from './watchlistSlice/watchlistSlice';
import likesReducer from './likesSlice/likesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    likes: likesReducer,
    watchlist: watchlistReducer,
  },
});