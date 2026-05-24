import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { MarketTicker } from "./components/MarketTicker";
import { BackendStatus } from "./components/BackendStatus";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import { Stocks } from "./pages/Stocks";
import { IPO } from "./pages/IPO";
import { Watchlist } from "./pages/Watchlist";
import { News } from "./pages/News";
import { Baskets } from "./pages/Baskets";
import { Profile } from "./pages/Profile";
import { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

function AppContent() {
  const location = useLocation();
  const showBackendStatus = location.pathname !== "/" && location.pathname !== "/login" && location.pathname !== "/signup";

  return (
    <>
      <Navbar />
      {showBackendStatus && <BackendStatus />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MarketTicker />
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stocks"
          element={
            <ProtectedRoute>
              <MarketTicker />
              <Stocks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ipo"
          element={
            <ProtectedRoute>
              <MarketTicker />
              <IPO />
            </ProtectedRoute>
          }
        />
        <Route
          path="/watchlist"
          element={
            <ProtectedRoute>
              <MarketTicker />
              <Watchlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/news"
          element={
            <ProtectedRoute>
              <MarketTicker />
              <News />
            </ProtectedRoute>
          }
        />
        <Route
          path="/baskets"
          element={
            <ProtectedRoute>
              <MarketTicker />
              <Baskets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <MarketTicker />
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

function App() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-background text-foreground">
          <AppContent />

          {/* Dark Mode Toggle - Fixed Position */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform z-50"
            aria-label="Toggle dark mode"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
