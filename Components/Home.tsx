//2025-06-13 : Adding dummy function for meal form submit handling
//2025-06-13 : Tidying up the styles
//2025-06-12 : Moving Calendar and Form views to different states, Improving Collapsible buttons
//2025-06-05 : Adding MealForm, SymptomForm and Calendar, collapsible buttons for the forms
//2025-06-03 : Creating file and initialising a basic render
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Calendar from './Calendar/Calendar';
import { ColumnContainer, RowContainer, PressableContainer, StyledText, CollapsibleContainer, ScrollableContainer } from '../CustomComponents/CustomComponents';
import MealForm from './MealForm/MealForm';
import SymptomForm from './SymptomForm/SymptomForm';
import type Meal from '../Types/Meal';
import type Symptom from '../Types/Symptom';
import type TrackerDay from '../Types/TrackerDay';

export default function Home() {

  const [focusForm, setFocusForm] = useState<"Meal" | "Symptom" | null>(null);
  const [trackerData, setTrackerData] = useState<TrackerDay[]>([]); // Placeholder for tracker data

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleSubmit = (mealName: string) => {
    
  };

  return (
    <ScrollableContainer style={{borderRadius: 0, padding: 0, margin:0, justifyContent:"flex-start", flexDirection:"column", minWidth:"100%"}}>
      <Text style={{ textAlign:"center", color:"white"}}>Welcome to the Home Screen!</Text>
      <ColumnContainer style={{display: !selectedDate ? "none" : "flex", flex:1, justifyContent:"flex-start", alignItems:"flex-start"}}>
        <PressableContainer
          onPress={() => setSelectedDate(null)}
          style={{alignSelf:"flex-start"}}>
          <StyledText style={{textAlign: "center", fontSize: 18}}>
            {"Back to Calendar"}
          </StyledText>
        </PressableContainer>
        <StyledText style={{textAlign: "center", fontSize: 18}}>
          {selectedDate ? `Selected Date: ${selectedDate.toLocaleDateString()}` : "No date selected"}
        </StyledText>
        <CollapsibleContainer
          collapsibleTitle="Meals"
          isExpanded={focusForm === "Meal"}
          onPress={() => setFocusForm(focusForm === "Meal" ? null : "Meal")}
          >
          <MealForm submitHandler={handleSubmit}/>
        </CollapsibleContainer>
        <CollapsibleContainer
          collapsibleTitle="Symptoms"
          isExpanded={focusForm === "Symptom"}
          onPress={() => setFocusForm(focusForm === "Symptom" ? null : "Symptom")}
          >
          <SymptomForm />
        </CollapsibleContainer>
      </ColumnContainer>
      <Calendar setSelectedDate={setSelectedDate} isVisible={!selectedDate}/>
    </ScrollableContainer>
  );
}

