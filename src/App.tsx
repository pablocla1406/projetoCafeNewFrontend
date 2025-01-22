import { ThemeProvider } from "./components/darkMode&Toggle/themeprovider"

interface AppProps {
  children: React.ReactNode;
}

function App({ children }: AppProps) {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="flex flex-col h-screen">
        {children}
      </div>
    </ThemeProvider>
  )
}

export default App
