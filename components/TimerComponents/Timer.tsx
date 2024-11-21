import { useState, useEffect, useRef, useCallback } from 'react';
import { TimerProps } from '@/lib/props';
import { formatTime } from '@/lib/utils';

export default function Timer({ onTimeAdded }: TimerProps) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // New state variables for key handling
  const [keyPressed, setKeyPressed] = useState(false);
  const [isReadyToStart, setIsReadyToStart] = useState(false);
  const holdTimeoutId = useRef<NodeJS.Timeout | null>(null);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const handleReset = useCallback(() => {
    setTime(0);
  }, []);

  // Handle keydown and keyup events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();

        if (isRunning) {
          // Stop the timer if it's running
          setIsRunning(false);
        } else if (!keyPressed) {
          // Start the hold timer when space is pressed
          setKeyPressed(true);
          holdTimeoutId.current = setTimeout(() => {
            setIsReadyToStart(true);
          }, 300); // 0.3 seconds
        }
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();

        if (keyPressed) {
          if (!isRunning && isReadyToStart) {
            // Start the timer if ready
            setIsRunning(true);
          }
          // Reset key states
          setKeyPressed(false);
          setIsReadyToStart(false);
          if (holdTimeoutId.current) {
            clearTimeout(holdTimeoutId.current);
            holdTimeoutId.current = null;
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isRunning, keyPressed, isReadyToStart]);

  // Update the timer interval
  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    } else {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    }

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };
  }, [isRunning]);

  // Handle timer completion
  const prevIsRunningRef = useRef(isRunning);

  useEffect(() => {
    const prevIsRunning = prevIsRunningRef.current;
    if (prevIsRunning && !isRunning && time > 0) {
      onTimeAdded(time);
      handleReset();
    }
    prevIsRunningRef.current = isRunning;
  }, [isRunning, time, onTimeAdded, handleReset]);

  return (
    <div className="flex flex-col items-center">
      {/* Timer Display */}
      <div
        className={`text-4xl font-bold ${
          keyPressed
            ? isReadyToStart
              ? 'text-green-500'
              : 'text-red-500'
            : ''
        }`}
      >
        {formatTime(time)}
      </div>

      {/* Instructions */}
      <div className="mt-2 text-sm text-gray-400">
        {keyPressed
          ? isReadyToStart
            ? 'Release Space to start the timer'
            : 'Hold Space to start the timer'
          : isRunning
          ? 'Press Space to stop the timer'
          : 'Hold Space for 0.3s to start the timer'}
      </div>
      
    </div>
  );
}
