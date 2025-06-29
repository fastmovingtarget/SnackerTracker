//2025-06-13 : Meals and Symptoms are now the correct type
//2025-06-03 : Initialising basic type implementation
import type Meal from "./Meal";
import type Symptom from "./Symptom";

export default interface TrackerDay {
    Date: string; // ISO date string
    Meals: Meal[]; // Array of meal names
    Symptoms: Symptom[]; // Array of symptom names
    Notes?: string; // Optional notes for the day
}