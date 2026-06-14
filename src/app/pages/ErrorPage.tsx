import { usePageTitle } from "../../hooks/usePageTitle";
import { Link, useRouteError, isRouteErrorResponse, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { AlertTriangle, Home, RefreshCw, ArrowLeft, Wifi, Lock, Search } from "lucide-react";

interface ErrorPageProps {
  code?: number;
  title?: string;
  message?: string;
}

const ERROR_CONFIGS: Record<number, { icon: typeof AlertTriangle; title: string; message: string; color: string }> = {
  404: {
    icon: Search,
    title: "Page Not Found",
    message: "The page you're looking for doesn't exist or has been moved.",
    color: "from-blue-500 to-cyan-500",
  },
  403: {
    icon: Lock,
    title: "Access Denied",
    message: "You don't have permission to view this page.",
    color: "from-amber-500 to-orange-500",
  },
  500: {
    icon: AlertTriangle,
    title: "Server Error",
    message: "Something went wrong on our end. We're working on it.",
    color: "from-red-500 to-rose-500",
  },
  503: {
    icon: Wifi,
    title: "Service Unavailable",
    message: "The service is temporarily offline. Please try again shortly.",
    color: "from-purple-500 to-violet-500",
  },
};

export function ErrorPage({ code, title, message }: ErrorPageProps) {
  const routeError = useRouteError?.();
  const navigate = useNavigate();
  usePageTitle(title ?? "Error");

  // Resolve error details from router or props
  let resolvedCode = code ?? 500;
  let resolvedTitle = title;
  let resolvedMessage = message;

  if (isRouteErrorResponse?.(routeError)) {
    resolvedCode = routeError.status;
    resolvedTitle = routeError.statusText;
    resolvedMessage = typeof routeError.data === "string" ? routeError.data : undefined;
  } else if (routeError instanceof Error && !title) {
    resolvedMessage = routeError.message;
  }

  const config = ERROR_CONFIGS[resolvedCode] ?? ERROR_CONFIGS[500];
  const Icon = config.icon;

  const floatingParticles = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #07090f 0%, #0d1117 100%)" }}
    >
      {/* Grid texture */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "52px 52px",
        }}
      />

      {/* Floating glow orbs */}
      {floatingParticles.map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: Math.random() * 6 + 3,
            height: Math.random() * 6 + 3,
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            background: i % 2 === 0 ? "#00e5cc" : "#3b82f6",
            opacity: 0.4,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Radial glow behind icon */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(0,229,204,0.07) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -60%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center max-w-lg w-full"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${config.color} flex items-center justify-center mb-6 shadow-2xl`}
          style={{ boxShadow: "0 0 60px rgba(0,229,204,0.2)" }}
        >
          <Icon className="w-12 h-12 text-white" />
        </motion.div>

        {/* Error code */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-7xl font-black mb-4 tabular-nums"
          style={{
            background: "linear-gradient(90deg,#00e5cc,#3b82f6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {resolvedCode}
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-2xl font-bold mb-3"
          style={{ color: "#ffffff" }}
        >
          {resolvedTitle ?? config.title}
        </motion.h1>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-base mb-10 leading-relaxed"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          {resolvedMessage ?? config.message}
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 w-full"
        >
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200"
            style={{
              background: "linear-gradient(135deg,#00e5cc,#3b82f6)",
              color: "#07090f",
              boxShadow: "0 0 24px rgba(0,229,204,0.25)",
            }}
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.75)",
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>

          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.75)",
            }}
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
        </motion.div>

        {/* Brand footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="mt-16 text-xs"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          AniAMC · If this keeps happening, contact support.
        </motion.p>
      </motion.div>
    </div>
  );
}
