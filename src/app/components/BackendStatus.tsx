import { useEffect, useState } from "react";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { AlertCircle, CheckCircle, Terminal, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function BackendStatus() {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    checkBackendStatus();
  }, []);

  const checkBackendStatus = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/health', {
        method: 'GET',
        signal: AbortSignal.timeout(3000)
      });
      setIsOnline(response.ok);
    } catch (error) {
      setIsOnline(false);
    }
  };

  if (dismissed || isOnline === null || isOnline === true) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-20 left-1/2 -translate-x-1/2 z-40 w-full max-w-2xl px-4"
      >
        <Card className="bg-warning/10 border-warning/20">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <p className="font-medium">Backend Server Offline</p>
                <button
                  onClick={() => setDismissed(true)}
                  className="p-1 hover:bg-accent rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Start the backend to see live Indian stock market data
              </p>
              <div className="bg-background rounded-lg p-3 font-mono text-sm mb-3">
                <code className="text-success">pnpm dev:full</code>
              </div>
              <div className="flex items-center gap-2">
                <Button onClick={checkBackendStatus} size="sm" variant="outline">
                  Check Again
                </Button>
                <Button onClick={() => setDismissed(true)} size="sm" variant="ghost">
                  Dismiss
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
