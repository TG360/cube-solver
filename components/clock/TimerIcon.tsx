import React from 'react';
import { Timer, Pause, Play } from 'lucide-react';

interface TimerIconProps {
  isRunning: boolean;
  time: number;
}

export function TimerIcon({ isRunning, time }: TimerIconProps) {
  return (
    <div className="text-blue-400">
      {isRunning ? (
        <Pause className="w-8 h-8 animate-pulse" />
      ) : time === 0 ? (
        <Timer className="w-8 h-8" />
      ) : (
        <Play className="w-8 h-8" />
      )}
    </div>
  );
}