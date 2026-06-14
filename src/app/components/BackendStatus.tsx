import { useEffect, useState } from "react";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { AlertCircle, Database, Cloud, CheckCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useUserDataContext } from "../../context/UserDataContext";

export function BackendStatus() {
  const [isBackendOnline, setIsBackendOnline] = useState<boolean | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const { synced, loading } = useUserDataContext();

  useEffect(() => {
    checkBackendStatus();
  }, []);

  const checkBackendStatus = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/health', {
        method: 'GET',
        signal: AbortSignal.timeout(3000)
      });
      setIsBackendOnline(response.ok);
    } catch {
      setIsBackendOnline(false);
    }
  };

  const showWarning = !dismissed && isBackendOnline === false;

  return (
    <>
      {/* Persistent sync badge (top-right, subtle) */}
      {!loading && (
        <div className="fixed top-4 right-4 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-background/80 backdrop-blur border border-border/50 shadow-sm">
          <Database className={`w-3 h-3 ${isBackendOnline ? 'text-success' : 'text-muted-foreground'}`} />
          <span className={isBackendOnline ? 'text-success' : 'text-muted-foreground'}>
            {isBackendOnline ? 'MongoDB' : 'Local'}
          </span>
          <span className="text-muted-foreground/40 mx-0.5">·</span>
          <Cloud className={`w-3 h-3 ${synced ? 'text-primary' : 'text-muted-foreground'}`} />
          <span className={synced ? 'text-primary' : 'text-muted-foreground'}>
            {synced ? 'Synced' : 'Offline'}
          </span>
        </div>
      )}

      {/* Backend offline warning banner */}
      <AnimatePresence>
        {showWarning && (
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
                  <p className="text-sm text-muted-foreground mb-1">
                    Start the backend to enable MongoDB persistence. Data is being saved to Supabase cache in the meantime.
                  </p>
                  <div className="bg-background rounded-lg p-3 font-mono text-sm mb-3">
                    <code className="text-success">pnpm dev:full</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button onClick={checkBackendStatus} size="sm" variant="outline">
                      <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
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
        )}
      </AnimatePresence>
    </>
  );
}
