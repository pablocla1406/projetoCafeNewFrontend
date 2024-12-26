import { Children } from "react"
import { ThemeProvider } from "./components/darkMode&Toggle/themeprovider"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {children}
    </ThemeProvider>
  )
}

export default App
