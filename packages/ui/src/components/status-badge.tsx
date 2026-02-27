import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const statusStyles: Record<string, { bg: string; text: string; dot: string }> = {
  pending: { bg: "bg-yellow-100", text: "text-yellow-700", dot: "bg-yellow-500" },
  approved: { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
  rejected: { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500" },
  cancelled: { bg: "bg-gray-100", text: "text-gray-700", dot: "bg-gray-500" },
  active: { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
  inactive: { bg: "bg-gray-100", text: "text-gray-700", dot: "bg-gray-500" },
  planning: { bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500" },
  on_hold: { bg: "bg-yellow-100", text: "text-yellow-700", dot: "bg-yellow-500" },
  completed: { bg: "bg-emerald-100", text: "text-emerald-700", dot: "bg-emerald-500" },
  draft: { bg: "bg-gray-100", text: "text-gray-700", dot: "bg-gray-500" },
  sent: { bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500" },
  paid: { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
  overdue: { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500" },
  available: { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
  assigned: { bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500" },
  maintenance: { bg: "bg-yellow-100", text: "text-yellow-700", dot: "bg-yellow-500" },
  retired: { bg: "bg-gray-100", text: "text-gray-700", dot: "bg-gray-500" },
};

interface StatusBadgeProps {
  status: string;
  showDot?: boolean;
  className?: string;
}

export function StatusBadge({
  status,
  showDot = true,
  className,
}: StatusBadgeProps) {
  const styles = statusStyles[status] ?? statusStyles.pending;
  const label = status.replace(/_/g, " ");

  return (
    <span
      className={twMerge(
        clsx(
          "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium capitalize",
          styles.bg,
          styles.text,
          className
        )
      )}
    >
      {showDot && (
        <span className={clsx("h-1.5 w-1.5 rounded-full", styles.dot)} />
      )}
      {label}
    </span>
  );
}
