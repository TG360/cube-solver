'use client'; 

import Timer from '@/components/TimerComponents/Timer';
import RecordDisplay from '@/components/DisplayComponents/RecordDisplay'; 
import StatsDisplay from '@/components/DisplayComponents/StatsDisplay';
import { useStoredTimes } from '@/hooks/useStoredTimes';


export default function Page() { 
  const { times, addTime, deleteTime, resetTimes } = useStoredTimes();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Timer onTimeAdded={addTime} />
      <div className="flex flex-row w-full justify-around gap-4 mt-4">
          <RecordDisplay times={times} deleteTime={deleteTime} resetTimes={resetTimes} />
          <StatsDisplay times={times} />
      </div>
    </div>
  );
}
