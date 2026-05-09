import { cn } from "../../../lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'destructive' | 'warning' | 'outline';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    default: "bg-muted text-muted-foreground",
    success: "bg-success/10 text-success border border-success/20",
    destructive: "bg-destructive/10 text-destructive border border-destructive/20",
    warning: "bg-warning/10 text-warning border border-warning/20",
    outline: "border border-border bg-transparent"
  };

  return (
    <span className={cn(
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}
