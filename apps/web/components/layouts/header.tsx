"use client";

import { Bell, Search, Moon, Sun } from "lucide-react";
import { useAuthStore } from "@/lib/store/auth-store";
import { useState } from "react";

export function Header() {
  const { user } = useAuthStore();
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-[var(--card)] px-6">
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
        <input
          type="search"
          placeholder="Search employees, projects, clients..."
          className="h-9 w-full rounded-lg border bg-[var(--muted)] pl-9 pr-4 text-sm outline-none focus:border-[var(--color-primary-500)] focus:ring-1 focus:ring-[var(--color-primary-500)]"
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--muted-foreground)] border rounded px-1.5 py-0.5 bg-[var(--background)]">
          /
        </kbd>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleDarkMode}
          className="rounded-lg p-2 hover:bg-[var(--muted)] transition-colors"
        >
          {darkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>

        <button className="relative rounded-lg p-2 hover:bg-[var(--muted)] transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[var(--color-danger-500)]" />
        </button>
      </div>
    </header>
  );
}
