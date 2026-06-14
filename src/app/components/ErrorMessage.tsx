import { AlertCircle, RefreshCw, Terminal } from "lucide-react";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  const isBackendError = message.includes('Backend server') || message.includes('server:watch');

  return (
    <div className="flex flex-col items-center justify-center py-12 max-w-2xl mx-auto">
      <AlertCircle className="w-12 h-12 text-destructive mb-4" />
      <p className="text-lg font-medium mb-2">Oops! Something went wrong</p>
      <p className="text-muted-foreground mb-6 text-center">{message}</p>

      {isBackendError && (
        <Card className="bg-muted/50 border-warning/20 p-6 mb-6 w-full">
          <div className="flex items-start gap-3">
            <Terminal className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium mb-2">Backend Server Required</p>
              <p className="text-sm text-muted-foreground mb-4">
                To see live stock market data, start the backend server:
              </p>
              <div className="bg-background rounded-lg p-3 font-mono text-sm mb-3">
                <code className="text-success">npm run dev:full</code>
              </div>
              <p className="text-xs text-muted-foreground">
                This will start both the backend (port 3001) and frontend (port 5173)
              </p>
            </div>
          </div>
        </Card>
      )}

      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      )}
    </div>
  );
}
