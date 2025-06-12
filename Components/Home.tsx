//2025-06-12 : Moving Calendar and Form views to different states, Improving Collapsible buttons
//2025-06-05 : Adding MealForm, SymptomForm and Calendar, collapsible buttons for the forms
//2025-06-03 : Creating file and initialising a basic render
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Calendar from './Calendar/Calendar';
import { ColumnContainer, RowContainer, PressableContainer, StyledText, CollapsibleContainer, ScrollableContainer } from '../CustomComponents/CustomComponents';
import MealForm from './MealForm/MealForm';
import SymptomForm from './SymptomForm/SymptomForm';

export default function Home() {

  const [focusForm, setFocusForm] = useState<"Meal" | "Symptom" | null>(null);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <ScrollableContainer style={{margin: 0, borderRadius: 0, padding: 0, justifyContent:"flex-start"}}>
      <Text style={{ textAlign:"center", color:"white" }}>Welcome to the Home Screen!</Text>
      <ColumnContainer style={{display: !selectedDate ? "none" : "flex", flex:1}}>
        <PressableContainer
          onPress={() => setSelectedDate(null)}>
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
          <MealForm />
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

