import { useState, useEffect } from 'react';

export function useFont() {
  const [font, setFont] = useState(() => {
    // Try to get the font from localStorage on initial load
    if (typeof window !== 'undefined') {
      return localStorage.getItem('font') || 'sans';
    }
    return 'sans';
  });

  useEffect(() => {
    // Update localStorage and apply font when it changes
    localStorage.setItem('font', font);
    document.documentElement.style.fontFamily = getFontFamily(font);
  }, [font]);

  return { font, setFont };
}

function getFontFamily(font: string): string {
  switch (font) {
    case 'sans':
      return 'ui-sans-serif, system-ui, sans-serif';
    case 'serif':
      return 'ui-serif, Georgia, serif';
    case 'mono':
      return 'ui-monospace, monospace';
    default:
      return 'ui-sans-serif, system-ui, sans-serif';
  }
}
