//2025-08-23 : Meal Form now only contains text input
//2025-08-19 : Meal Form now has handling for edit and delete buttons
//2025-06-13 : Adding form change and submit handlers
//2025-06-12 : Minor text editing
//2025-06-05 : Added and tested meal name form
//2025-06-04 : Initial Commit with placeholder implementation
import React from 'react';
import {Button, EditableText, RowContainer} from '../../../../CustomComponents/CustomComponents';
import type Meal from '../../../../Types/Meal';

export default function MealForm({ submitHandler, meal, index }: { submitHandler: (newMeal: Meal, index: number) => void, meal: Meal, index: number }) {

    const [editedMeal, setEditedMeal] = React.useState<Meal>(meal);

    const handleChangeText = (text: string) => {
        setEditedMeal({ ...editedMeal, Meal_Name: text });
    };
    
    const handleFinishEditing = () => {
        submitHandler(editedMeal, index);
    };

    return (
        <RowContainer>
            <EditableText
                text={meal.Meal_Name}
                onChangeText={(text) => handleChangeText(text)}
                onFinishEditing={handleFinishEditing}
                containerStyle={{marginBottom: 10}}
                aria-label={`Meal Name Input ${index + 1}`}
                placeholder='Enter Meal Name...'
            />
        </RowContainer>
    );
}