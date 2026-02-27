import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const sizes = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

interface AvatarProps {
  name: string;
  src?: string | null;
  size?: keyof typeof sizes;
  className?: string;
}

export function Avatar({ name, src, size = "md", className }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={twMerge(
          clsx("rounded-full object-cover", sizes[size], className)
        )}
      />
    );
  }

  return (
    <div
      className={twMerge(
        clsx(
          "flex items-center justify-center rounded-full bg-[var(--color-primary-100)] text-[var(--color-primary-700)] font-medium",
          sizes[size],
          className
        )
      )}
      title={name}
    >
      {initials}
    </div>
  );
}
