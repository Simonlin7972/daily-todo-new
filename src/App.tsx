import { TodoList } from './components/TodoList'
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import './App.css'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background font-sans antialiased">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex-1"></div>
            <div className="flex items-center justify-center flex-1">
              <a className="flex items-center space-x-2 " href="/">  
                <span className="font-['Pacifico'] text-2xl font-bold text-primary">Simon's Daily Todo</span>
              </a>
            </div>
            <div className="flex-1 flex justify-end">
              <ModeToggle />
            </div>
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
