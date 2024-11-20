import { TimeRecord } from "@/lib/props";
import { useEffect, useState } from "react";
import { useStatsTimes } from "@/hooks/useStatsTimes";
import { formatTime } from "@/lib/utils";

export default function MeanTime({times} : {times: TimeRecord[]}) {
    const { meanTime } = useStatsTimes();
    const [mean, setMean] = useState(() => meanTime(times));

    useEffect(() => {
        setMean(meanTime(times));
    }, [times, meanTime]);

    return (
        <div className="mt-8 w-full max-w-md bg-gray-800 rounded-lg p-6">
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-4xl font-bold">Total Times: {times.length}</h2>
            </div>
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-4xl font-bold">Mean Time: {formatTime(mean)}</h2>
            </div>
        </div>
    );
}
