//2025-08-19 : Meal Form now has handling for edit and delete buttons
//2025-06-13 : Adding form change and submit handlers
//2025-06-12 : Minor text editing
//2025-06-05 : Added and tested meal name form
//2025-06-04 : Initial Commit with placeholder implementation
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {ColumnContainer, RowContainer, PressableContainer, StyledText, StyledTextInput, EditableText} from '../../CustomComponents/CustomComponents';
import type Meal from '../../Types/Meal';

export default function MealForm({ submitHandler, existingMeals }: { submitHandler: (submitType : "Meals", newMeals: Meal[]) => void, existingMeals?: Meal[] }) {

    const [meals, setMeals] = React.useState<Meal[]>(existingMeals || []);

    const addMeal = () => {
        const newMeal: Meal = { Meal_Name: ""}; // Assuming Meal_ID is just an incrementing number
        setMeals([...meals, newMeal]);
    };

    const handleChangeText = (index: number, newText: string) => {
        const updatedMeals = [...meals];
        updatedMeals[index].Meal_Name = newText;
        setMeals(updatedMeals);
    };

    const handleDelete = (index: number) => {
        const updatedMeals = meals.filter((_, i) => i !== index);
        setMeals(updatedMeals);
    };

    const handleFinishEditing = () => {
        
        submitHandler("Meals", meals);
    };

    return (
        <ColumnContainer>
            {
                existingMeals && existingMeals.map((meal, index) => 
                {
                    return (
                        <EditableText
                            key={index}
                            text={meal.Meal_Name}
                            onChangeText={(text) => handleChangeText(index, text)}
                            onDelete={() => handleDelete(index)}
                            onFinishEditing={handleFinishEditing}
                            containerStyle={{marginBottom: 10}}
                            aria-label={`Meal ${index + 1}`}
                        />
                    )
                })
            }
            <PressableContainer onPress={addMeal}>
                <StyledText style={{textAlign: "center", fontSize: 18}}>
                    {"Add New Meal"}
                </StyledText>
            </PressableContainer>
        </ColumnContainer>
    );
}