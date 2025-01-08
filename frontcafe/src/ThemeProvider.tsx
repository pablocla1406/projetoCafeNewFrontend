import { Children } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useFont } from "./hooks/useFont";
import { useEffect } from "react";

interface AppProps {
  children: React.ReactNode;
}

function App({children}: AppProps) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  )
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { font } = useFont();

  useEffect(() => {
    // Apply initial font from localStorage
    const savedFont = localStorage.getItem('font') || 'sans';
    document.documentElement.style.fontFamily = getFontFamily(savedFont);
  }, []);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
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

export default App
