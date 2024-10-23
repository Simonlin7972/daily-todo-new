import React from 'react'
import { TodoList } from './components/TodoList'
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { Button } from "@/components/ui/button"
import './App.css'
import './i18n'
import { useTranslation } from 'react-i18next'

export const App: React.FC = () => {
  const { t } = useTranslation();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen font-sans antialiased bg-background text-foreground flex flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center px-4">
            <div className="flex-shrink-0 w-16"></div>
            <div className="flex-grow flex items-center justify-center">
              <a className="flex items-center space-x-2" href="/">  
                <span className="font-['Pacifico'] text-2xl font-bold text-primary whitespace-nowrap">{t('appTitle')}</span>
              </a>
            </div>
            <div className="flex-shrink-0 flex justify-end items-center space-x-2">
              <LanguageToggle />
              <ModeToggle />
            </div>
          </div>
        </header>
        <main className="flex-grow w-full py-6">
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
