import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={twMerge(
        clsx(
          "rounded-xl border bg-[var(--card)] p-6",
          hover && "transition-shadow hover:shadow-md",
          className
        )
      )}
    >
      {children}
    </div>
  );
}
