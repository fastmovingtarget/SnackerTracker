//2025-09-04 : Tracker context to handle write/read from memory logic
import TrackerDay from "./TrackerDay";

export interface ITrackerContext {
    trackerArray: TrackerDay[],
    handleSubmit: (day: TrackerDay, fromHome?: boolean) => void,
    selectedDate: TrackerDay,
    setSelectedDate: (day: Date) => void,
    isKeyboard: boolean
}