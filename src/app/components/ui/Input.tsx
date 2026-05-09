import { cn } from "../../../lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-2">
          {label}
        </label>
      )}
      <input
        className={cn(
          "w-full px-4 py-2 rounded-lg border border-input bg-input-background",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
          "transition-all duration-200",
          "placeholder:text-muted-foreground",
          error && "border-destructive focus:ring-destructive",
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}
