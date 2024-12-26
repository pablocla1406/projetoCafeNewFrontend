import { ThemeProvider } from "./components/darkMode&Toggle/themeprovider"


interface AppProps {
  children: React.ReactNode;
}

function App({ children }: AppProps) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {children}
    </ThemeProvider>
  )
}

export default App
