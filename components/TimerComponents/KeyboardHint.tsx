import React from 'react';

interface KeyboardHintProps {
  isRunning: boolean;
}

export function KeyboardHint({ isRunning }: KeyboardHintProps) {
  return (
    <div className="text-gray-400 text-sm">
      Press <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">Space</kbd> to{' '}
      {isRunning ? 'stop' : 'start'}
    </div>
  );
}