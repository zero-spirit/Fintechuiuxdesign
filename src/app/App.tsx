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
            <>
              <MarketTicker />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/stocks"
          element={
            <>
              <MarketTicker />
              <Stocks />
            </>
          }
        />
        <Route
          path="/ipo"
          element={
            <>
              <MarketTicker />
              <IPO />
            </>
          }
        />
        <Route
          path="/watchlist"
          element={
            <>
              <MarketTicker />
              <Watchlist />
            </>
          }
        />
        <Route
          path="/news"
          element={
            <>
              <MarketTicker />
              <News />
            </>
          }
        />
        <Route
          path="/baskets"
          element={
            <>
              <MarketTicker />
              <Baskets />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <MarketTicker />
              <Profile />
            </>
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
    </Router>
  );
}

export default App;
