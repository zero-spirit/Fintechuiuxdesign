import { motion } from "motion/react";

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <motion.div
        className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-muted rounded w-3/4"></div>
      <div className="h-4 bg-muted rounded w-1/2"></div>
      <div className="h-20 bg-muted rounded"></div>
    </div>
  );
}
