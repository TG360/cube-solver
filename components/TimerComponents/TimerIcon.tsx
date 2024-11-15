import { Timer, Pause, Play } from 'lucide-react';
import { TimerIconProps } from '@/lib/props';


export function TimerIcon({ isRunning, time }: TimerIconProps) {
  return (
    <div className="text-indigo-300">
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