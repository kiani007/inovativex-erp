import {
  format,
  formatDistanceToNow,
  differenceInBusinessDays,
  addDays,
  isWeekend,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from "date-fns";

// ============================================================
// Date Utilities
// ============================================================

export function formatDate(date: string | Date): string {
  return format(new Date(date), "MMM dd, yyyy");
}

export function formatDateTime(date: string | Date): string {
  return format(new Date(date), "MMM dd, yyyy HH:mm");
}

export function formatTime(date: string | Date): string {
  return format(new Date(date), "HH:mm");
}

export function timeAgo(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function calculateBusinessDays(start: string, end: string): number {
  return differenceInBusinessDays(new Date(end), new Date(start)) + 1;
}

export function getWorkingDaysInMonth(year: number, month: number): number {
  const start = startOfMonth(new Date(year, month - 1));
  const end = endOfMonth(start);
  const days = eachDayOfInterval({ start, end });
  return days.filter((day) => !isWeekend(day)).length;
}

// ============================================================
// Currency Utilities
// ============================================================

export function formatCurrency(
  amount: number,
  currency: string = "USD"
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
}

export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

// ============================================================
// String Utilities
// ============================================================

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}

export function generateId(prefix: string, num: number): string {
  return `${prefix}-${String(num).padStart(3, "0")}`;
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
}

// ============================================================
// Color Utilities (for status badges)
// ============================================================

export const STATUS_COLORS = {
  // Leave
  pending: { bg: "bg-yellow-100", text: "text-yellow-800", dot: "bg-yellow-500" },
  approved: { bg: "bg-green-100", text: "text-green-800", dot: "bg-green-500" },
  rejected: { bg: "bg-red-100", text: "text-red-800", dot: "bg-red-500" },
  cancelled: { bg: "bg-gray-100", text: "text-gray-800", dot: "bg-gray-500" },

  // Project
  planning: { bg: "bg-blue-100", text: "text-blue-800", dot: "bg-blue-500" },
  active: { bg: "bg-green-100", text: "text-green-800", dot: "bg-green-500" },
  on_hold: { bg: "bg-yellow-100", text: "text-yellow-800", dot: "bg-yellow-500" },
  completed: { bg: "bg-emerald-100", text: "text-emerald-800", dot: "bg-emerald-500" },

  // Task
  backlog: { bg: "bg-gray-100", text: "text-gray-800", dot: "bg-gray-500" },
  todo: { bg: "bg-blue-100", text: "text-blue-800", dot: "bg-blue-500" },
  in_progress: { bg: "bg-indigo-100", text: "text-indigo-800", dot: "bg-indigo-500" },
  review: { bg: "bg-purple-100", text: "text-purple-800", dot: "bg-purple-500" },
  done: { bg: "bg-green-100", text: "text-green-800", dot: "bg-green-500" },

  // Invoice
  draft: { bg: "bg-gray-100", text: "text-gray-800", dot: "bg-gray-500" },
  sent: { bg: "bg-blue-100", text: "text-blue-800", dot: "bg-blue-500" },
  viewed: { bg: "bg-indigo-100", text: "text-indigo-800", dot: "bg-indigo-500" },
  paid: { bg: "bg-green-100", text: "text-green-800", dot: "bg-green-500" },
  overdue: { bg: "bg-red-100", text: "text-red-800", dot: "bg-red-500" },

  // Asset
  available: { bg: "bg-green-100", text: "text-green-800", dot: "bg-green-500" },
  assigned: { bg: "bg-blue-100", text: "text-blue-800", dot: "bg-blue-500" },
  maintenance: { bg: "bg-yellow-100", text: "text-yellow-800", dot: "bg-yellow-500" },
  retired: { bg: "bg-gray-100", text: "text-gray-800", dot: "bg-gray-500" },
} as const;

export type StatusKey = keyof typeof STATUS_COLORS;

export function getStatusColor(status: string) {
  return STATUS_COLORS[status as StatusKey] ?? STATUS_COLORS.pending;
}

// ============================================================
// Validation Helpers
// ============================================================

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
