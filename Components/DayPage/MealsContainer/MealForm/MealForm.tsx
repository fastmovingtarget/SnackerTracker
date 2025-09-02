//2025-09-02 : Cleaned collapsible logic, editable text, moved new meal to Container
//2025-08-28 : Fixed meal name switching to editing when date is re-clicked
//2025-08-27 : Adding Colour theme export/import
//2025-08-26 : added expandHandler, improved placeholder meal ingredient logic
//2025-08-25 : Meal Form expands to show meal ingredients
//2025-08-23 : Meal Form now only contains text input
//2025-08-19 : Meal Form now has handling for edit and delete buttons
//2025-06-13 : Adding form change and submit handlers
//2025-06-12 : Minor text editing
//2025-06-05 : Added and tested meal name form
//2025-06-04 : Initial Commit with placeholder implementation
import React, { useState, useRef, useEffect } from 'react';
import { Pressable, TextInput } from 'react-native';
import { RowContainer, ColumnContainer, StyledText, StyledTextInput, EditableText } from '../../../../CustomComponents/CustomComponents';
import type Meal from '../../../../Types/Meal';

export default function MealForm({ submitHandler, meal, index }: { submitHandler: (newMeal: Meal, index: number) => void, meal: Meal, index: number }) {

    const [editedMeal, setEditedMeal] = useState<Meal>({ ...meal});
    const [editingMealName, setEditingMealName] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [editingIngredient, setEditingIngredient] = useState<number>(-1);

    useEffect(() => {
        setEditingMealName(false);
        setEditedMeal({ ...meal });
    }, [meal]);

    const rotateString = isExpanded ? "90deg" : "0deg";

    const handleFinishEditingName = (text: string) => {
        setEditingMealName(false);
        submitHandler({...meal, Meal_Name: text }, index);
    };

    const handleFinishEditingIngredient = (text:string, ingredientIndex:number) => {
        let newMealIngredients = meal.Meal_Ingredients || [];
        if (text.trim() !== "") {
            newMealIngredients[editingIngredient] = { Ingredient_Name: text };
        }else{
            newMealIngredients = newMealIngredients.filter((_, idx) => idx !== editingIngredient);
        }

        setEditingIngredient(-1);
        submitHandler({...meal, Meal_Ingredients: newMealIngredients }, index);
    };

    const handleAddNewIngredient = (text:string) => {
        if (text.trim() !== "") {
            const newMealIngredients = meal.Meal_Ingredients ? [...meal.Meal_Ingredients, { Ingredient_Name: text }] : [{ Ingredient_Name: text }];
            submitHandler({...meal, Meal_Ingredients: newMealIngredients }, index);
        }
    }

    const expandHandler = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <ColumnContainer >
            <Pressable 
                onPress={expandHandler}
                onLongPress={() => setEditingMealName(true)}
            >
                <RowContainer style={{justifyContent: "flex-start", padding:0}}>
                    <StyledText style={{fontSize:20, fontWeight:"bold", transform:[{rotate:rotateString}], paddingVertical:0}}>{"\u203A"}</StyledText>
                    <EditableText  
                        text={editedMeal.Meal_Name}
                        onFinishEditing={handleFinishEditingName}
                        isEditing={editingMealName}
                        placeholder='Enter a meal name...'
                        autoFocus={true}
                        aria-label={`Meal Name ${index + 1}`}
                    />
                </RowContainer>
            </Pressable>
            <ColumnContainer style={{ display: isExpanded ? "flex" : "none", padding:0 }}>
                {
                    editedMeal.Meal_Ingredients?.map((ingredient, idx) =>
                    <Pressable
                        onPress={() => setEditingIngredient(idx)}
                        key={`ingredient-${index}-${idx}`} style={{padding:0}}>
                        <RowContainer>
                            <StyledText style={{
                                    fontSize: 15,
                                    paddingVertical: 0
                                }}>{"\u2022"}</StyledText>
                            <EditableText
                                text={ingredient.Ingredient_Name}
                                onFinishEditing={(text) => handleFinishEditingIngredient(text, idx)}
                                aria-label={`Ingredient Name ${idx + 1}`}
                                placeholder='Enter ingredient name...'
                                isEditing={idx === editingIngredient}
                            />
                        </RowContainer>
                    </Pressable>
                )}
                <RowContainer>
                    <StyledTextInput
                        defaultValue=''
                        aria-label={`New Ingredient Name Input`}
                        placeholder='Enter new ingredient name...'
                        onFinishEditing={handleAddNewIngredient}
                    />
                </RowContainer>
            </ColumnContainer>
        </ColumnContainer>
    );
}
//