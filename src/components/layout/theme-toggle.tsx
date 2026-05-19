"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="rounded-full p-2 text-zinc-400"
        disabled
      >
        <span className="block h-5 w-5" aria-hidden="true" />
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="rounded-full p-2 text-zinc-900 transition-colors hover:bg-[#f4eddf] hover:text-[#a77a2d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a77a2d] dark:text-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-[#d6b36a] dark:focus-visible:ring-[#d6b36a]"
    >
      {isDark ? (
        <Sun className="h-5 w-5" aria-hidden="true" />
      ) : (
        <Moon className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
}
