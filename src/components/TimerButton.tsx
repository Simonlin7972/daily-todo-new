import React, { useState, useEffect } from 'react';
import { Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function TimerButton() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="fixed bottom-4 left-4 text-2xl font-bold">
          {formatTime(time)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48">
        <div className="flex flex-col space-y-2">
          <Button onClick={startTimer} disabled={isRunning}>開始計時</Button>
          <Button onClick={pauseTimer} disabled={!isRunning}>暫停計時</Button>
          <Button onClick={resetTimer}>重新計時</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
