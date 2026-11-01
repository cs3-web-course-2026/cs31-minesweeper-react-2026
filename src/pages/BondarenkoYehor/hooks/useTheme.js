import { useCallback, useState } from 'react';

const THEME_KEY = 'minesweeper-theme';

function getInitialTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
  } catch {
    // localStorage is unavailable, fall back to the system theme
  }
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch {
        // localStorage is unavailable, the theme just won't be remembered
      }
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}
