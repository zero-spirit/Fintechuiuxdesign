import { cn } from "../../../lib/utils";
import { motion } from "motion/react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  glass?: boolean;
}

export function Card({ children, className, hoverable = false, glass = false }: CardProps) {
  const baseStyles = "relative rounded-xl p-6 border border-border";
  const glassStyles = glass ? "bg-card/50 backdrop-blur-lg" : "bg-card";
  const hoverStyles = hoverable ? "hover:shadow-lg hover:border-primary/50 cursor-pointer" : "";

  return (
    <motion.div
      whileHover={hoverable ? { y: -4, transition: { duration: 0.2 } } : {}}
      className={cn(baseStyles, glassStyles, hoverStyles, "transition-all duration-200", className)}
    >
      {children}
    </motion.div>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mb-4", className)}>{children}</div>;
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn("font-semibold", className)}>{children}</h3>;
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn(className)}>{children}</div>;
}
