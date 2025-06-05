//2025-06-05 : Symptom form now actually has some text input, tested
//2025-06-04 : Initial Commit with placeholder implementation
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {ColumnContainer, RowContainer, PressableContainer, StyledText, StyledTextInput} from '../../CustomComponents/CustomComponents';

export default function SymptomForm() {
    return (
        <ColumnContainer >
            <StyledText >Symptom Form</StyledText>
            <StyledTextInput 
                aria-label='Symptom Name Form'
                placeholder='Enter Symptom Name...'
                style={{ marginBottom: 10 }} // Add some margin for better spacing
            />
            <StyledTextInput 
                aria-label='Symptom Description Form'
                placeholder='Enter Symptom Description...'
                style={{ marginBottom: 10 }} // Add some margin for better spacing
            />
            
        </ColumnContainer>
    );
}