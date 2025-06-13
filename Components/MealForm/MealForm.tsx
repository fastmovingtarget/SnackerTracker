//2025-06-13 : Adding form change and submit handlers
//2025-06-12 : Minor text editing
//2025-06-05 : Added and tested meal name form
//2025-06-04 : Initial Commit with placeholder implementation
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {ColumnContainer, RowContainer, PressableContainer, StyledText, StyledTextInput} from '../../CustomComponents/CustomComponents';

export default function MealForm({ submitHandler }: { submitHandler: (mealName: string) => void }) {

    const [formContent, setFormContent] = React.useState("");

    return (
        <ColumnContainer>
            <StyledText>Meals Form</StyledText>
            <StyledTextInput 
                aria-label='Meal Name Form'
                placeholder='Enter Meal Name'
                onChangeText={(text) => setFormContent(text)}
            />
            <PressableContainer onPress={() => submitHandler(formContent)}>
                <StyledText style={{textAlign: "center", fontSize: 18}}>
                    {"Submit Meal"}
                </StyledText>
            </PressableContainer>
        </ColumnContainer>
    );
}