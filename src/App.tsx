import React, { useState, useEffect } from 'react'
import { TodoList } from './components/TodoList'
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { Button } from "@/components/ui/button"
import { MobileMenu } from "@/components/MobileMenu"
import './App.css'
import './i18n'
import { useTranslation } from 'react-i18next'

export const App: React.FC = () => {
  const { t } = useTranslation();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen font-sans antialiased bg-background text-foreground flex flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="relative flex h-16 items-center px-4">
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
              <a className="flex items-center space-x-2" href="/">  
                <span className="font-['Pacifico'] text-2xl font-bold text-primary whitespace-nowrap">{t('appTitle')}</span>
              </a>
            </div>
            <div className="ml-auto flex items-center space-x-4">
              <span className="text-sm hidden md:inline">{formatTime(currentTime)}</span>
              <div className="hidden md:flex items-center space-x-2">
                <LanguageToggle />
                <ModeToggle />
              </div>
              <MobileMenu currentTime={formatTime(currentTime)} />
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
