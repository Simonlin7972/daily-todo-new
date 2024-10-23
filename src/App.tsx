import { TodoList } from './components/TodoList'
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { Button } from "@/components/ui/button"
import './App.css'
import './i18n'
import { useTranslation } from 'react-i18next'

function App() {
  const { t } = useTranslation();

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen font-sans antialiased bg-background text-foreground">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex-1"></div>
            <div className="flex items-center justify-center flex-1">
              <a className="flex items-center space-x-2 " href="/">  
                <span className="font-['Pacifico'] text-2xl font-bold text-primary">{t('appTitle')}</span>
              </a>
            </div>
            <div className="flex-1 flex justify-end space-x-2">
              <LanguageToggle />
              <ModeToggle />
            </div>
          </div>
        </header>
        <main className="w-full min-h-screen py-6">
          <TodoList />
        </main>
        <div className="fixed bottom-4 right-4 space-x-2">
          <Button variant="outline" id="addDataBtn">{t('addData')}</Button>
          <Button variant="outline" id="resetBtn">{t('reset')}</Button>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
