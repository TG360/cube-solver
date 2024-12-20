import { useState, useCallback, useEffect } from 'react';
import { TimeRecord } from '@/lib/props';

const STORAGE_KEY = 'timer-records';
const MAX_RECORDS = 25; // Increased to store more records

export function useStoredTimes() {
  const [times, setTimes] = useState<TimeRecord[]>([]);

  useEffect(() => {
    const storedTimes = localStorage.getItem(STORAGE_KEY);
    if (storedTimes) {
      setTimes(JSON.parse(storedTimes));
    }
  }, []);

  const addTime = useCallback((time: number) => {
    const newRecord: TimeRecord = {
      time,
      date: new Date().toISOString(),
    };

    setTimes((prevTimes) => {
      // Check if this exact time already exists to prevent duplicates
      const timeExists = prevTimes.some(
        (record) =>
          record.time === newRecord.time &&
          new Date(record.date).getTime() === new Date(newRecord.date).getTime()
      );

      if (timeExists) {
        return prevTimes;
      }

      const updatedTimes = [...prevTimes, newRecord]
        .sort((a, b) => a.time - b.time)
        .slice(0, MAX_RECORDS);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTimes));
      return updatedTimes;
    });
  }, []);

  const deleteTime = useCallback((index: number) => {
    setTimes((prevTimes) => {
      const updatedTimes = [...prevTimes];
      updatedTimes.splice(index, 1);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTimes));
      return updatedTimes;
    });
  }, []);

  const resetTimes = useCallback(() => {
    setTimes([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { times, addTime, deleteTime, resetTimes };
}