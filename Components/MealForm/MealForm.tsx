//2025-06-05 : Added and tested meal name form
//2025-06-04 : Initial Commit with placeholder implementation
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {ColumnContainer, RowContainer, PressableContainer, StyledText, StyledTextInput} from '../../CustomComponents/CustomComponents';

export default function MealForm() {
    return (
        <ColumnContainer>
            <StyledText>Meal Form</StyledText>
            <StyledTextInput 
                aria-label='Meal Name Form'
                placeholder='Enter Meal Name'
            />
        </ColumnContainer>
    );
}