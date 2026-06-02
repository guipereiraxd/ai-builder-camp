"use client";

import { useState, useEffect } from "react";

export const THEME_KEY = "aibc-theme";
export type Theme = "dark" | "light";

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="7.05" y2="7.05" />
      <line x1="16.95" y1="16.95" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="7.05" y2="16.95" />
      <line x1="16.95" y1="7.05" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY) as Theme | null;
    const initial: Theme = saved === "light" ? "light" : "dark";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem(THEME_KEY, next);
    document.documentElement.setAttribute("data-theme", next);
  };

  return [theme, toggle];
}

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, toggle] = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Mudar para modo claro" : "Mudar para modo escuro"}
      title={theme === "dark" ? "Modo claro" : "Modo escuro"}
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "28px",
        height: "28px",
        borderRadius: "6px",
        border: "1px solid var(--border)",
        background: "transparent",
        color: "var(--text-4)",
        cursor: "pointer",
        transition: "color 0.15s, border-color 0.15s, background 0.15s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.color = "var(--text-2)";
        (e.currentTarget as HTMLElement).style.background = "var(--tint-4)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.color = "var(--text-4)";
        (e.currentTarget as HTMLElement).style.background = "transparent";
      }}
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
