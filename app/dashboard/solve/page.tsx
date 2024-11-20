'use client'; 

import Timer from '@/components/ui/Timer';
import RecordDisplay from '@/components/ui/RecordDisplay'; 
import StatsDisplay from '@/components/ui/StatsDisplay';
import { useStoredTimes } from '@/hooks/useStoredTimes';
import { useStatsTimes } from '@/hooks/useStatsTimes';


export default function Page() { 
  const { times, addTime, deleteTime } = useStoredTimes();
  const { meanTime } = useStatsTimes();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Timer onTimeAdded={addTime} />
      <div className="flex flex-row w-full justify-around gap-4 mt-4">
          <RecordDisplay times={times} deleteTime={deleteTime} />
          <StatsDisplay times={times} meanTime={meanTime} />
      </div>
    </div>
  );
}
