//2025-08-27 : Adding Colour theme export/import
//2025-08-26 : DayPage changed submitHandler to handleSubmit
//2025-08-23 : Creating a container for the day's symptoms and meals
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ColumnContainer, RowContainer, PressableContainer, StyledText, CollapsibleContainer, ScrollableContainer } from '../../CustomComponents/CustomComponents';
import SymptomsContainer from './SymptomsContainer/SymptomsContainer';
import type Meal from '../../Types/Meal';
import type Symptom from '../../Types/Symptom';
import type TrackerDay from '../../Types/TrackerDay';
import MealsContainer from './MealsContainer/MealsContainer';

export default function DayPage({selectedDate, backHandler, submitHandler} : {selectedDate: TrackerDay | null, backHandler : () => void, index?: number, submitHandler: (day : TrackerDay) => void}) {

  const handleSubmitMeal = (submitArray : Meal[]) => {
    if (selectedDate) {
        const updatedTrackerDay = {
            ...selectedDate,
            Meals:[...submitArray]
        };
        submitHandler(updatedTrackerDay);
    }
  };
  
  const handleSubmitSymptom = (submitArray : Symptom[]) => {
    if (selectedDate) {
        const updatedTrackerDay = {
            ...selectedDate,
            Symptoms:[...submitArray]
        };
        submitHandler(updatedTrackerDay);
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
        <RowContainer>
          <StyledText style={{textAlign: "center", fontSize: 18, width: "100%"}}>
            {selectedDate ? `${selectedDate.Date.toLocaleDateString()}` : "No date selected"}
          </StyledText>
        </RowContainer>
        <MealsContainer onSubmit={handleSubmitMeal} meals={selectedDate?.Meals || []}/>
        <SymptomsContainer onSubmit={handleSubmitSymptom} symptoms={selectedDate?.Symptoms || []}/>
      </ColumnContainer>
    </ScrollableContainer>
  );
}