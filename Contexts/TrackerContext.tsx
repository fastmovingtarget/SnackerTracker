//2025-09-04 : Tracker context to handle write/read from memory logic
import {useContext, createContext, useState, useEffect} from "react"
import { EmitterSubscription, Keyboard } from "react-native";
import TrackerDay from "../Types/TrackerDay";
import { ITrackerContext } from "../Types/ITrackerContext";
import { readFromStorage, writeToStorage, clearStorage } from "../Functions/StorageFunctions";
import { clear } from "@testing-library/user-event/dist/cjs/utility/clear.js";


const TrackerContext = createContext<ITrackerContext>({
    trackerArray: [],
    handleSubmit: () => {},
    selectedDate: {
                    Date: new Date(),
                    Meals: [],
                    Symptoms: [],
                    Notes: ""
                },
    setSelectedDate: () => {},
    isKeyboard: false

});

function TrackerArrayProvider({children} : {children:React.ReactNode}){ 
    const [trackerArray, setTrackerArray] = useState<TrackerDay[]>([]);
    const [selectedDate, setSelectedDate] = useState<TrackerDay>({
                    Date: new Date(new Date().toDateString()),//we don't want the time component
                    Meals: [],
                    Symptoms: [],
                    Notes: ""
                });
    const [isKeyboard, setIsKeyboard] = useState<boolean>(false);

    useEffect(() => {
        let keyboardDidShowListener : EmitterSubscription;
        let keyboardDidHideListener : EmitterSubscription;
        if (trackerArray.length === 0) {
            keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
                setIsKeyboard(true);
            });
            keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
                setIsKeyboard(false);
            });

            readFromStorage("trackerData").then((data) => {
                let parsedTrackerData : TrackerDay[] = [];

                if (data) {
                    parsedTrackerData = (data as TrackerDay[]).map((day: TrackerDay) => {
                        return {
                            ...day,
                            Date: new Date(day.Date)// Ensure Date is a Date object
                        }
                    });
                } 

                let todayDay : TrackerDay | undefined = parsedTrackerData.find(day => new Date(day.Date).toDateString() === new Date().toDateString());

                if (!todayDay) {
                    parsedTrackerData.push(selectedDate);
                } else {
                    setSelectedDate(todayDay);
                }
                setTrackerArray(parsedTrackerData);
            })
        }
        return () => {
            if(keyboardDidShowListener)
                keyboardDidShowListener.remove();
            if(keyboardDidHideListener)
                keyboardDidHideListener.remove();
        };
    }, []);

    const handleSubmit = (day : TrackerDay, fromHome : boolean = false)  => {
        const dateIndex = trackerArray.findIndex((day : TrackerDay) => day.Date.valueOf() === selectedDate?.Date.valueOf());

        const newTrackerArray = [...trackerArray];

        if (dateIndex === -1) {
            // If the date does not exist, create a new TrackerDay
            newTrackerArray.push(day);
        } else {
            newTrackerArray[dateIndex] = day;
        }
        if(!fromHome)
            setSelectedDate(day); // Update the selected date to the existing TrackerDay

        setTrackerArray(newTrackerArray);
        writeToStorage("trackerData", newTrackerArray); // Save updated tracker data to storage
    };

    const dateSelect = (date: Date) => {
        const newSelectedDate = trackerArray.find(day => new Date(day.Date).toDateString() === date.toDateString()) || 
            {
                Date: date,
                Meals: [],
                Symptoms: [],
                Notes: ""
            } as TrackerDay;

        setSelectedDate(newSelectedDate);
    };

    return (
        <TrackerContext.Provider value={{trackerArray: trackerArray, handleSubmit: handleSubmit, selectedDate, setSelectedDate : dateSelect, isKeyboard}}>
            {children}
        </TrackerContext.Provider>
    )
}

export default TrackerArrayProvider;

export const useTrackerArray = () => {
    return useContext(TrackerContext);
}