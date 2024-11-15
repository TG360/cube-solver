'use client'; 

import Timer from '@/components/ui/Timer';
import RecordDisplay from '@/components/ui/RecordDisplay'; 
import { useStoredTimes } from '@/hooks/useStoredTimes';

export default function Page() { 
  const { times, addTime, deleteTime } = useStoredTimes();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Timer onTimeAdded={addTime}/>
      <RecordDisplay times={times} deleteTime={deleteTime}/> 
    </div>
  );
}