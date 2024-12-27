import { ThemeProvider } from "./components/darkMode&Toggle/themeprovider"
import NavBar from "./components/navBar/NavBar";

interface AppProps {
  children: React.ReactNode;
}

function App({ children }: AppProps) {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="flex flex-col h-screen">
        <NavBar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
