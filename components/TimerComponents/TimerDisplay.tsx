import React from 'react';

interface TimerDisplayProps {
  time: number;
}

export function TimerDisplay({ time }: TimerDisplayProps) {
  const formatTime = (timeInMs: number): string => {
    const minutes = Math.floor(timeInMs / 60000);
    const seconds = Math.floor((timeInMs % 60000) / 1000);
    const milliseconds = Math.floor((timeInMs % 1000) / 10);

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-6xl font-mono text-white tracking-wider">
      {formatTime(time)}
    </div>
  );
}