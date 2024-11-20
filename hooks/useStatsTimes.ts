import { useState, useCallback, useEffect } from 'react';
import { TimeRecord } from '@/lib/props';

const STORAGE_KEY = 'timer-records';

export function useStatsTimes() {
  const [times, setTimes] = useState<TimeRecord[]>([]);

  useEffect(() => {
    const storedTimes = localStorage.getItem(STORAGE_KEY);
    if (storedTimes) {
      setTimes(JSON.parse(storedTimes));
    }
  }, []);

  const meanTime = useCallback(() => {
    if (times.length === 0) {
      return 0;
    } else {
      const total = times.reduce((acc, time) => acc + time.time, 0);
      return total / times.length;
    }
  }, [times]);

  return { meanTime };
}