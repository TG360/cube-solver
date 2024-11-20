import { useCallback } from 'react';
import { TimeRecord } from '@/lib/props';

export function useStatsTimes() {

  const meanTime = useCallback((times: TimeRecord[]) => {
    if (times.length === 0) {
      return 0;
    } else {
      const total = times.reduce((acc, time) => acc + time.time, 0);
      return total / times.length;
    }
  }, []);

  return { meanTime };
}