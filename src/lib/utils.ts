import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-IN').format(value);
}

export function formatPercent(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

export function formatCompactNumber(value: number): string {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)}Cr`;
  }
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(2)}L`;
  }
  if (value >= 1000) {
    return `₹${(value / 1000).toFixed(2)}K`;
  }
  return `₹${value}`;
}

export function getRiskColor(risk: 'low' | 'medium' | 'high'): string {
  switch (risk) {
    case 'low':
      return 'text-success';
    case 'medium':
      return 'text-warning';
    case 'high':
      return 'text-destructive';
  }
}

export function getChangeColor(change: number): string {
  return change >= 0 ? 'text-success' : 'text-destructive';
}

export function getStatusBadgeColor(status: string): string {
  switch (status) {
    case 'upcoming':
      return 'bg-primary/10 text-primary';
    case 'open':
      return 'bg-success/10 text-success';
    case 'closed':
      return 'bg-warning/10 text-warning';
    case 'listed':
      return 'bg-muted text-muted-foreground';
    default:
      return 'bg-muted text-muted-foreground';
  }
}
