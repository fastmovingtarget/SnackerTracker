//2025-06-03 : Initialising basic type implementation
export default interface TrackerDay {
    Date: string; // ISO date string
    Meals: string[]; // Array of meal names
    Symptoms: string[]; // Array of symptom names
    Notes?: string; // Optional notes for the day
}