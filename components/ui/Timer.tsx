import { useState, useEffect, useCallback } from 'react';
import { Timer as TimerIcon, Pause, Play } from 'lucide-react';
import { TimerProps } from '@/lib/props';
import { formatTime } from '@/lib/utils';


export default function Timer({ onTimeAdded }: TimerProps) {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  const handleReset = useCallback(() => {
    setTime(0);
  }, []);

  const toggleTimer = useCallback(() => {
    if (isRunning) {
      if (time > 0) {
        onTimeAdded(time);
        handleReset();
      }
    }
    setIsRunning(!isRunning);
  }, [isRunning, time, onTimeAdded, handleReset]);

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
        setTime((prev) => prev + 10);
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
    <div
      onClick={toggleTimer}
      className="bg-gray-800 p-12 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 cursor-pointer select-none"
    >
      <div className="flex flex-col items-center space-y-8">
        <div className="text-blue-400">
          {isRunning ? (
            <Pause className="w-8 h-8 animate-pulse" />
          ) : time === 0 ? (
            <TimerIcon className="w-8 h-8" />
          ) : (
            <Play className="w-8 h-8" />
          )}
        </div>
        <div className="text-6xl font-mono text-white tracking-wider">
          {formatTime(time)}
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="text-gray-400 text-sm">
            Press <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">Space</kbd> to{' '}
            {isRunning ? 'stop' : 'start'}
          </div>
          {!isRunning && time > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleReset();
              }}
              className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
            >
              Reset Timer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}