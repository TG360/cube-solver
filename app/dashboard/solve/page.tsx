'use client';

import { useState, useEffect, useCallback } from 'react';
import { TimerDisplay } from '@/components/clock/TimerDisplay';
import { TimerIcon } from '@/components/clock/TimerIcon';
import { KeyboardHint } from '@/components/clock/KeyboardHint';

export default function Page() {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  const toggleTimer = useCallback(() => {
    setIsRunning(prev => !prev);
  }, []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        toggleTimer();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [toggleTimer]);

  useEffect(() => {
    if (isRunning) {
      const id = window.setInterval(() => {
        setTime(prev => prev + 10); // Increment by 10ms
      }, 10);
      setIntervalId(id);
    } else if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div 
        onClick={toggleTimer}
        className="bg-gray-800 p-12 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 cursor-pointer select-none"
      >
        <div className="flex flex-col items-center space-y-8">
          <TimerIcon isRunning={isRunning} time={time} />
          <TimerDisplay time={time} />
          <KeyboardHint isRunning={isRunning} />
        </div>
      </div>
    </div>
  );
}