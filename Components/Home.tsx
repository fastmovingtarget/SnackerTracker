//2025-06-05 : Adding MealForm, SymptomForm and Calendar, collapsible buttons for the forms
//2025-06-03 : Creating file and initialising a basic render
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Calendar from './Calendar/Calendar';
import ColumnContainer from '../CustomComponents/ColumnContainer';
import RowContainer from '../CustomComponents/RowContainer';
import MealForm from './MealForm/MealForm';
import SymptomForm from './SymptomForm/SymptomForm';
import PressableContainer from '../CustomComponents/PressableContainer';
import StyledText from '../CustomComponents/StyledText';

export default function Home() {

  const [focusForm, setFocusForm] = React.useState<"Meal" | "Symptom" | null>(null);

  return (
    <View >
      <Text style={{textAlign:"center"}}>Welcome to the Home Screen!</Text>
      <ColumnContainer>
        <PressableContainer onPress={() => setFocusForm(focusForm === "Meal" ? null : "Meal")}>
          <StyledText >{focusForm === "Meal" ? "v" : ">"}Meals</StyledText>
        </PressableContainer>
        <RowContainer style={{ display: focusForm === "Meal" ? "flex" : "none"}}>
          <MealForm />
        </RowContainer>
        <PressableContainer onPress={() => setFocusForm(focusForm === "Symptom" ? null : "Symptom")}>
          <StyledText >{focusForm === "Symptom" ? "v" : ">"}Symptoms</StyledText>
        </PressableContainer>
        <RowContainer style={{ display: focusForm === "Symptom" ? "flex" : "none"}}>
          <SymptomForm />
        </RowContainer>
      </ColumnContainer>
      <Calendar />
    </View>
  );
}

