import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "./ui/Button";

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 max-w-2xl mx-auto">
      <AlertCircle className="w-12 h-12 text-destructive mb-4" />
      <p className="text-lg font-medium mb-2">Something went wrong</p>
      {message && <p className="text-muted-foreground mb-6 text-center">{message}</p>}
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      )}
    </div>
  );
}
