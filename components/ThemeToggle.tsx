"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

/**
 * Dark/light theme toggle. Flips the `dark` class on <html> and persists the
 * choice to localStorage. The no-FOUC script in the root layout applies the
 * stored theme before paint, so this only needs to reflect + update it.
 */
export function ThemeToggle(): React.JSX.Element {
  const [theme, setTheme] = React.useState<Theme>("dark");

  React.useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  function toggle(): void {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* ignore storage failures (private mode) */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-hair/15 text-fg/70 transition-colors hover:border-gold/50 hover:text-fg"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
