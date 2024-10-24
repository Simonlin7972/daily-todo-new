import React, { useState, useEffect } from 'react'
import { TodoList } from './components/TodoList'
import { ThemeProvider } from "@/components/theme-provider"
import { TopNavBar } from "@/components/TopNavBar"
import { BottomBar } from "@/components/BottomBar"
import './App.css'
import './i18n'

function App() {
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
        <TopNavBar currentTime={formatTime(currentTime)} />
        <main className="flex-grow w-full py-8 pb-28 bg-gradient-to-b from-background to-muted">
          <TodoList />
        </main>
        <BottomBar />
      </div>
    </ThemeProvider>
  )
};

export default App;
