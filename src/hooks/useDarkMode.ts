import { useEffect, useState } from 'react';

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return true;
    const stored = window.localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', isDark);
    root.classList.toggle('light', !isDark);
    window.localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return { isDark, toggle: () => setIsDark((v) => !v) };
}
