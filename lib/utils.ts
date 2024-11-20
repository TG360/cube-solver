import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(timeInMs: number): string {
  const seconds = Math.floor((timeInMs % 60000) / 1000)
  const milliseconds = Math.floor((timeInMs % 1000) / 10)

  return `${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}s`
}

export function formatDate(dateStr: string) : string {
  return new Date(dateStr).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
};
