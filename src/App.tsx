import { TodoList } from './components/TodoList'
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import './App.css'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background font-sans antialiased">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-14 items-center justify-between px-4">
            <div className="flex items-center">
              <a className="flex items-center space-x-2" href="/">  
                <span className="font-bold">Simon's Daily Todo</span>
              </a>
            </div>
            <ModeToggle />
          </div>
        </header>
        <main className="w-full min-h-screen py-6 bg-slate-100 dark:bg-slate-800">
          <TodoList />
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
