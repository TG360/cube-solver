import { StatsDisplayProps } from "@/lib/props";
import { formatTime } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function StatsDisplay({times, meanTime}: StatsDisplayProps) {
    const [mean, setMean] = useState(() => meanTime());

    useEffect(() => {
        const calcMean = meanTime();
        setMean(calcMean);
    }, [times, meanTime]);

    return (
        <div className="mt-8 w-full max-w-md bg-gray-800 rounded-lg p-6">
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-4xl font-bold">{times.length}</h2>
                <p className="text-gray-400 text-sm">Total Times: {times.length}</p>
            </div>
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-4xl font-bold">{formatTime(mean)}</h2>
                <p className="text-gray-400 text-sm">Mean Time: {formatTime(mean)}</p>
            </div>
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-4xl font-bold">{times.length}</h2>
                <p className="text-gray-400 text-sm">Total Times</p>
            </div>
        </div>
    );
}