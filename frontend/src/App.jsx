import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/Layout/AppLayout";
import { Home } from "./pages/Home";
import "./App.css";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCurrentUser } from "./features/auth/authSlice";
import { fetchLikes } from "./features/likesSlice/likesSlice";
import { fetchWatchlist } from "./features/watchlistSlice/watchlistSlice";
import { UserProfile } from "./pages/UserProfile";
import { NotFoundPage } from "./pages/ErrorPage";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WatchlistPage } from "./pages/WishListPage";
import { MovieDetail } from "./pages/MovieDetail";
import { LikesPage } from "./pages/LikePage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { SplashScreen } from "./components/SplashScreen";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [hasFetched, setHasFetched] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await dispatch(getCurrentUser()).unwrap();
        if (result) {
          await Promise.all([
            dispatch(fetchLikes()).unwrap(),
            dispatch(fetchWatchlist()).unwrap(),
          ]);
        }
        setHasFetched(true);
      } catch (error) {
        console.error("Error loading initial data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [dispatch]);

  const queryClient = new QueryClient();

  if (isLoading && showSplash) {
    return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <SplashScreen onComplete={() => setShowSplash(false)} />
        </BrowserRouter>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/wishlist" element={<WatchlistPage />} />
              <Route path="/likes" element={<LikesPage />} />
            </Route>
            
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Route>
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;