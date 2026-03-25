'use client';

import { useEffect } from 'react';
import { useTheme as useNextTheme } from 'next-themes';

/**
 * Custom hook to manage theme and sync CSS variables
 * Ensures CSS custom properties update when theme changes
 */
export function useTheme() {
  const { theme, setTheme, systemTheme } = useNextTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  useEffect(() => {
    // Sync CSS variables when theme changes
    if (currentTheme) {
      const htmlElement = document.documentElement;
      
      // Remove previous theme class
      htmlElement.classList.remove('light', 'dark');
      
      // Add current theme class
      if (currentTheme === 'dark') {
        htmlElement.classList.add('dark');
      } else {
        htmlElement.classList.add('light');
      }

      // Dispatch custom event for any listeners
      window.dispatchEvent(
        new CustomEvent('themechange', { detail: { theme: currentTheme } })
      );
    }
  }, [currentTheme]);

  return { theme, setTheme, currentTheme };
}
