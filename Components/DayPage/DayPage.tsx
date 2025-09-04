//2025-09-04 : Moving submit logic, styling changes
//2025-08-27 : Adding Colour theme export/import
//2025-08-26 : DayPage changed submitHandler to handleSubmit
//2025-08-23 : Creating a container for the day's symptoms and meals
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ColumnContainer, RowContainer, PressableContainer, StyledText, CollapsibleContainer, ScrollableContainer } from '../../CustomComponents/CustomComponents';
import SymptomsContainer from './SymptomsContainer/SymptomsContainer';
import type Meal from '../../Types/Meal';
import type Symptom from '../../Types/Symptom';
import { useTrackerArray } from '../../Contexts/TrackerContext';
import type TrackerDay from '../../Types/TrackerDay';
import Fonts from '../../Constants/Fonts';
import MealsContainer from './MealsContainer/MealsContainer';

export default function DayPage() {
  const { selectedDate, handleSubmit } = useTrackerArray();

  return (
      <ColumnContainer style={{display: !selectedDate ? "none" : "flex", flex:3, justifyContent:"flex-start", alignItems:"flex-start"}}>
        <ScrollableContainer style={{borderRadius: 0, padding: 0, margin:0, justifyContent:"flex-start", flexDirection:"column", minWidth:"100%"}}>
          <RowContainer>
            <StyledText style={{textAlign: "center", fontSize: Fonts.sizes.title, width: "100%"}}>
              {selectedDate ? `${new Intl.DateTimeFormat("en-GB", {dateStyle: "full"}).format(selectedDate.Date)}` : "No date selected"}
            </StyledText>
          </RowContainer>
          <MealsContainer />
          <SymptomsContainer />
        </ScrollableContainer>
      </ColumnContainer>
  );
}