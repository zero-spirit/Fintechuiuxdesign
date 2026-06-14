import { usePageTitle } from "../../hooks/usePageTitle";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Input } from "../components/ui/Input";
import { AlertCircle, ArrowRight, Shield, Zap, BarChart3 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const STATS = [
  { label: "Active Users", value: "2.4L+" },
  { label: "Assets Tracked", value: "₹840Cr" },
  { label: "Avg. Returns", value: "+18.3%" },
];

const FEATURES = [
  { icon: BarChart3, text: "Live NSE/BSE data with AI insights" },
  { icon: Shield,   text: "Bank-grade security & encryption" },
  { icon: Zap,      text: "Real-time IPO & portfolio alerts" },
];

export function Login() {
  const navigate   = useNavigate();
  const location   = useLocation();
  const { signIn, signInWithGoogle } = useAuth();

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await signIn(email, password);
    if (error) { setError(error.message); setLoading(false); }
    else navigate(from, { replace: true });
  };

  const handleGoogle = async () => {
    setError("");
    setLoading(true);
    const { error } = await signInWithGoogle();
    if (error) { setError(error.message); setLoading(false); }
  };

  usePageTitle("Sign In");
  return (
    <div
      className="min-h-screen flex overflow-hidden"
      style={{ background: "#07090f" }}
    >
      {/* ── Grid texture overlay ── */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,229,204,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,204,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── Radial teal glow – left ── */}
      <div
        className="fixed pointer-events-none"
        style={{
          left: "15%", top: "30%",
          width: 600, height: 600,
          background: "radial-gradient(circle, rgba(0,229,204,0.13) 0%, transparent 70%)",
          transform: "translate(-50%,-50%)",
        }}
      />
      {/* ── Subtle blue glow – right ── */}
      <div
        className="fixed pointer-events-none"
        style={{
          right: "5%", bottom: "10%",
          width: 400, height: 400,
          background: "radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 70%)",
        }}
      />

      {/* ══════════════════════════════════
          LEFT — hero panel
      ══════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex flex-1 flex-col justify-between p-14 relative z-10"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center w-fit">
          <span
            className="font-bold text-xl"
            style={{ background: "linear-gradient(90deg,#00e5cc,#3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            Ani.AMC
          </span>
        </Link>

        {/* Hero copy */}
        <div>
          {/* Pill badge */}
          <div className="flex items-center gap-2 mb-6">
            <span
              className="text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full border"
              style={{ color: "#00e5cc", borderColor: "rgba(0,229,204,0.3)", background: "rgba(0,229,204,0.08)" }}
            >
              🎯 &nbsp;Trade with confidence
            </span>
          </div>

          <h1
            className="text-5xl xl:text-6xl font-extrabold leading-tight mb-6"
            style={{ color: "#ffffff" }}
          >
            Instant Market<br />
            <span style={{ background: "linear-gradient(90deg,#00e5cc,#3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Updates
            </span>{" "}for<br />
            Smarter Investing
          </h1>

          <p className="text-base mb-10 leading-relaxed max-w-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            Stay in control of your finances with live NSE data, AI-powered portfolio tools, and expert IPO alerts — all in one platform.
          </p>

          {/* Feature list */}
          <div className="space-y-4 mb-12">
            {FEATURES.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(0,229,204,0.10)", border: "1px solid rgba(0,229,204,0.2)" }}
                >
                  <Icon className="w-4 h-4" style={{ color: "#00e5cc" }} />
                </div>
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>{text}</span>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-8">
            {STATS.map(({ label, value }) => (
              <div key={label}>
                <p className="text-2xl font-bold" style={{ color: "#ffffff" }}>{value}</p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom legal */}
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
          © 2026 Ani.AMC · SEBI Registered Investment Advisor
        </p>
      </motion.div>

      {/* ══════════════════════════════════
          RIGHT — login form
      ══════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-1 items-center justify-center p-6 sm:p-12 relative z-10"
      >
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <Link to="/" className="flex lg:hidden items-center mb-8 justify-center">
            <span
              className="font-bold text-xl"
              style={{ background: "linear-gradient(90deg,#00e5cc,#3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              Ani.AMC
            </span>
          </Link>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2" style={{ color: "#ffffff" }}>Welcome back</h2>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              Sign in to continue to your dashboard
            </p>
          </div>

          {/* Glass card */}
          <div
            className="rounded-2xl p-8"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.09)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {error && (
              <div
                className="flex items-start gap-2 p-3 rounded-xl mb-5 text-sm"
                style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", color: "#fca5a5" }}
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all disabled:opacity-50"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#ffffff",
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = "rgba(0,229,204,0.5)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>Password</label>
                  <Link to="/forgot-password" className="text-xs hover:underline" style={{ color: "#00e5cc" }}>
                    Forgot password?
                  </Link>
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all disabled:opacity-50"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#ffffff",
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = "rgba(0,229,204,0.5)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                />
              </div>

              {/* Remember me */}
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" className="rounded border-white/20 bg-white/5" disabled={loading} />
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>Remember me for 30 days</span>
              </label>

              {/* Sign in button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-60"
                style={{
                  background: "linear-gradient(135deg,#00e5cc,#3b82f6)",
                  color: "#07090f",
                  boxShadow: "0 0 24px rgba(0,229,204,0.25)",
                }}
                onMouseEnter={e => !loading && (e.currentTarget.style.boxShadow = "0 0 36px rgba(0,229,204,0.4)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 24px rgba(0,229,204,0.25)")}
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>Sign In <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 text-xs" style={{ background: "transparent", color: "rgba(255,255,255,0.3)" }}>
                  or continue with
                </span>
              </div>
            </div>

            {/* Google button */}
            <button
              type="button"
              onClick={handleGoogle}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-60"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.8)",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.09)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          </div>

          <p className="mt-6 text-center text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium hover:underline" style={{ color: "#00e5cc" }}>
              Create one free
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
