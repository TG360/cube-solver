import { StatsDisplayProps } from "@/lib/props";
import { useState } from "react";
import MeanTime from "@/components/StatsComponents/MeanTime";
import { statsType } from "@/lib/utils";
import Combobox from "@/components/ui/Combobox";

export default function StatsDisplay({times}: StatsDisplayProps) {
    const [type, setType] = useState('mean');

    const handleTypeChange = (newType: string) => {
        setType(newType);
    }

    return (
        <div className="relative mt-8 w-full max-w-md bg-gray-800 rounded-lg p-6">
            {/* Add a drop down button to cycle between statistical components*/}
            <div className="absolute top-0 left-0">
                <Combobox types={statsType} handleType={handleTypeChange}/>
            </div>
            {type === 'mean' ? <MeanTime times={times} /> : <div>Other Stats</div>}
        </div>
    );
}