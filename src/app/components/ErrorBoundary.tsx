import { Component, type ReactNode, type ErrorInfo } from "react";
import { motion } from "motion/react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[ErrorBoundary] Uncaught error:", error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

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
                linear-gradient(rgba(239,68,68,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(239,68,68,0.03) 1px, transparent 1px)
              `,
              backgroundSize: "52px 52px",
            }}
          />

          <div
            className="absolute pointer-events-none"
            style={{
              width: 500,
              height: 500,
              background: "radial-gradient(circle, rgba(239,68,68,0.08) 0%, transparent 70%)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -60%)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center text-center max-w-lg w-full"
          >
            {/* Icon */}
            <div
              className="w-24 h-24 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center mb-6"
              style={{ boxShadow: "0 0 60px rgba(239,68,68,0.25)" }}
            >
              <AlertTriangle className="w-12 h-12 text-white" />
            </div>

            <p
              className="text-7xl font-black mb-4"
              style={{
                background: "linear-gradient(90deg,#ef4444,#f97316)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Oops
            </p>

            <h1 className="text-2xl font-bold mb-3" style={{ color: "#ffffff" }}>
              Something Went Wrong
            </h1>

            <p className="text-sm mb-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
              An unexpected error occurred. This has been noted and we'll look into it.
            </p>

            {/* Error detail (collapsed) */}
            {this.state.error && (
              <details className="mb-8 w-full text-left">
                <summary
                  className="text-xs cursor-pointer mb-2 px-3 py-1.5 rounded-lg w-fit"
                  style={{ color: "rgba(255,255,255,0.35)", background: "rgba(255,255,255,0.05)" }}
                >
                  Show error details
                </summary>
                <pre
                  className="text-xs p-4 rounded-xl overflow-auto max-h-40 mt-2"
                  style={{
                    background: "rgba(239,68,68,0.08)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    color: "#fca5a5",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {this.state.error.message}
                </pre>
              </details>
            )}

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={this.handleReset}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
                style={{
                  background: "linear-gradient(135deg,#ef4444,#f97316)",
                  color: "#ffffff",
                  boxShadow: "0 0 24px rgba(239,68,68,0.25)",
                }}
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>

              <a
                href="/"
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.75)",
                }}
              >
                <Home className="w-4 h-4" />
                Go Home
              </a>
            </div>

            <p className="mt-16 text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
              AniAMC · If this keeps happening, contact support.
            </p>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}
