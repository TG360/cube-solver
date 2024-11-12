// Represents a single time record entry with two properties:
// - `time`: a numeric value representing the time duration or timestamp (e.g., in seconds or milliseconds).
// - `date`: a string representing the date when the time record was captured, formatted as "YYYY-MM-DD" or similar.
export interface TimeRecord {
    time: number;
    date: string;
}
  
// Properties for a component that displays a list of time records.
// - `times`: an array of `TimeRecord` objects, representing multiple time records to display.
export interface RecordDisplayProps {
    times: TimeRecord[];
}

// Properties for a timer component that allows adding new time records.
// - `onTimeAdded`: a callback function that is called whenever a new time is recorded. 
//   The function receives a `time` parameter representing the recorded time (e.g., in seconds or milliseconds).
export interface TimerProps {
    onTimeAdded: (time: number) => void;
}