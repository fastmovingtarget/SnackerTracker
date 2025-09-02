//2025-09-02 : Added today's meal/symptom input to home page
//2025-08-28 : Added a clearStorage function for testing, removed error flag when empty
//2025-08-26 : Day Page call now uses submitHandler rather than handleSubmit
//2025-08-23 : Home now uses the DayPage container
//2025-08-19 : Added Loading and Saving data to local storage
//2025-06-13 : Adding dummy function for meal form submit handling
//2025-06-13 : Tidying up the styles
//2025-06-12 : Moving Calendar and Form views to different states, Improving Collapsible buttons
//2025-06-05 : Adding MealForm, SymptomForm and Calendar, collapsible buttons for the forms
//2025-06-03 : Creating file and initialising a basic render
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Calendar from './Calendar/Calendar';
import { ColumnContainer, RowContainer, ScrollableContainer } from '../CustomComponents/CustomComponents';
import type TrackerDay from '../Types/TrackerDay';
import {writeToStorage, readFromStorage, clearStorage} from '../Functions/StorageFunctions';
import DayPage from './DayPage/DayPage';
import MealsContainer from './DayPage/MealsContainer/MealsContainer';
import SymptomsContainer from './DayPage/SymptomsContainer/SymptomsContainer';
import type Meal from '../Types/Meal';
import type Symptom from '../Types/Symptom';

export default function Home() {

  const [trackerData, setTrackerData] = useState<TrackerDay[]>([]); // Placeholder for tracker data
  const [todayData, setTodayData] = useState<TrackerDay | null>(null);
  const [selectedDate, setSelectedDate] = useState<TrackerDay | null>(null);

  useEffect(() => {
    readFromStorage("trackerData").then((data) => {
      if (data) {
        
        const parsedTrackerData : TrackerDay[] = (data as TrackerDay[]).map((day: TrackerDay) => {return {
          ...day,
          Date: new Date(day.Date)// Ensure Date is a Date object
        }});
        let todayDay : TrackerDay | undefined = parsedTrackerData.find(day => new Date(day.Date).toDateString() === new Date().toDateString())
        if (!todayDay) {
          todayDay = {
            Date: new Date(),
            Meals: [],
            Symptoms: [],
            Notes: ""
          } as TrackerDay;
          parsedTrackerData.push(todayDay);
        }
        setTodayData(todayDay);
        setTrackerData(parsedTrackerData);
      } else {
        setTrackerData([]); // Initialize with an empty array if no data is found
      }
    })
  }, []);


  const handleSubmit = (day : TrackerDay, fromHome : boolean = false) => {
    const dateIndex = trackerData.findIndex((day : TrackerDay) => day.Date.valueOf() === selectedDate?.Date.valueOf());

    const newTrackerData = [...trackerData];

    if (dateIndex === -1) {
      // If the date does not exist, create a new TrackerDay
      newTrackerData.push(day);
    }
    else{
      newTrackerData[dateIndex] = day;
    }
    if(!fromHome)
      setSelectedDate(day); // Update the selected date to the existing TrackerDay

    setTrackerData(newTrackerData);
    writeToStorage("trackerData", newTrackerData); // Save updated tracker data to storage
  };

  const calendarDateSelectHandler = (date: Date) => {
    const selectedTrackerDay = trackerData.find(day => new Date(day.Date).toDateString() === date.toDateString()) ||
                              {// Create a new TrackerDay if it doesn't exist
                                      Date: date, // Format date as YYYY-MM-DD
                                      Meals: [],
                                      Symptoms: [],
                                      Notes: ""
                              } as TrackerDay;

    setSelectedDate(selectedTrackerDay);// Set the selected date to the existing TrackerDay
  }

  return (
    <ScrollableContainer style={{borderRadius: 0, padding: 0, margin:0, justifyContent:"flex-start", flexDirection:"column", width:"100%"}}>
      <Text style={{ textAlign:"center", color:"white"}}>Welcome to the Home Screen!</Text>
      <ColumnContainer style={{display: !selectedDate ? "none" : "flex", flex:1, justifyContent:"flex-start", alignItems:"flex-start"}}>
        <DayPage selectedDate={selectedDate} backHandler={() => setSelectedDate(null)} submitHandler={handleSubmit} />
      </ColumnContainer>
      <ColumnContainer style={{display: selectedDate ? "none" : "flex", flex:1, justifyContent:"flex-start", alignItems:"flex-start", width:"100%"}}>
        <ScrollableContainer style={{justifyContent:"flex-start"}}>
          <MealsContainer meals={todayData?.Meals || []} onSubmit={(submitArray : Meal[]) => {
                  if(todayData === null) return;
                  const updatedTrackerDay : TrackerDay = {
                      ...todayData,
                      Meals:[...submitArray]
                  };
                  handleSubmit(updatedTrackerDay, true);
              }}/>
          <SymptomsContainer symptoms={todayData?.Symptoms || []} onSubmit={(submitArray : Symptom[]) => {
                  if(todayData === null) return;
                  const updatedTrackerDay : TrackerDay = {
                      ...todayData,
                      Symptoms:[...submitArray]
                  };
                  handleSubmit(updatedTrackerDay, true);
              }} />
        </ScrollableContainer>
        <Calendar setSelectedDate={calendarDateSelectHandler} isVisible={!selectedDate}/>
      </ColumnContainer>
    </ScrollableContainer>
  );
}

