//2025-08-23 : Creating a container for the day's symptoms and meals
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ColumnContainer, RowContainer, PressableContainer, StyledText, CollapsibleContainer, ScrollableContainer } from '../../CustomComponents/CustomComponents';
import SymptomsContainer from './SymptomsContainer/SymptomsContainer';
import type Meal from '../../Types/Meal';
import type Symptom from '../../Types/Symptom';
import type TrackerDay from '../../Types/TrackerDay';
import MealsContainer from './MealsContainer/MealsContainer';

export default function DayPage({selectedDate, backHandler, handleSubmit} : {selectedDate: TrackerDay | null, backHandler : () => void, index?: number, handleSubmit: (day : TrackerDay) => void}) {

  const handleSubmitMeal = (submitArray : Meal[]) => {
    if (selectedDate) {
        const updatedTrackerDay = {
            ...selectedDate,
            Meals:[...submitArray]
        };
        handleSubmit(updatedTrackerDay);
    }
  };
  
  const handleSubmitSymptom = (submitArray : Symptom[]) => {
    if (selectedDate) {
        const updatedTrackerDay = {
            ...selectedDate,
            Symptoms:[...submitArray]
        };
        handleSubmit(updatedTrackerDay);
    }
  };

  return (
    <ScrollableContainer style={{borderRadius: 0, padding: 0, margin:0, justifyContent:"flex-start", flexDirection:"column", minWidth:"100%"}}>
      <ColumnContainer style={{display: !selectedDate ? "none" : "flex", flex:1, justifyContent:"flex-start", alignItems:"flex-start"}}>
        <PressableContainer
          onPress={backHandler}
          style={{alignSelf:"flex-start"}}>
          <StyledText style={{textAlign: "center", fontSize: 18}}>
            {"Back to Calendar"}
          </StyledText>
        </PressableContainer>
        <StyledText style={{textAlign: "center", fontSize: 18}}>
          {selectedDate ? `${selectedDate.Date.toLocaleDateString()}` : "No date selected"}
        </StyledText>
          <MealsContainer onSubmit={handleSubmitMeal} meals={selectedDate?.Meals || []}/>
          <SymptomsContainer onSubmit={handleSubmitSymptom} symptoms={selectedDate?.Symptoms || []}/>
      </ColumnContainer>
    </ScrollableContainer>
  );
}