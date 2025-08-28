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
import { RowContainer, ColumnContainer, StyledText, StyledTextInput } from '../../../../CustomComponents/CustomComponents';
import type Meal from '../../../../Types/Meal';

export default function MealForm({ submitHandler, meal, index }: { submitHandler: (newMeal: Meal, index: number) => void, meal: Meal, index: number }) {

    const [editedMeal, setEditedMeal] = useState<Meal>({ ...meal, Meal_Ingredients: [...(meal.Meal_Ingredients || [{Ingredient_Name: ""}]), { Ingredient_Name: "" }] });
    const [editingMealName, setEditingMealName] = useState(meal.Meal_Name === "");
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        //possibilities for incoming meal, which is trimmed by MealsContainer
        //Name is blank and has no ingredients => don't add in a placeholder ingredient
        //Name is blank and has ingredients => add a placeholder ingredient
        //Name is not blank and has no ingredients => add a placeholder ingredient
        //Name is not blank and has ingredients => add a placeholder ingredient
        if(meal.Meal_Name === "" && (meal.Meal_Ingredients || []).length === 0) {
            setEditingMealName(true);
            setEditedMeal(meal);
        }
        else{
            setEditingMealName(false);
            setEditedMeal({ ...meal, Meal_Ingredients: [...(meal.Meal_Ingredients || []), { Ingredient_Name: "" }] });
        }
    }, [meal]);

    const rotateString = isExpanded ? "90deg" : "0deg";

    const handleChangeMealName = (text: string) => {
        setEditedMeal({ ...editedMeal, Meal_Name: text });
    };
    
    const handleFinishEditingName = () => {
        setEditingMealName(false);
        submitHandler(editedMeal, index);
    };

    const handleChangeIngredientText = (text: string, index: number) => {
        const updatedIngredients = [...(editedMeal.Meal_Ingredients || [])];
        updatedIngredients[index] = { ...updatedIngredients[index], Ingredient_Name: text };
        setEditedMeal({ ...editedMeal, Meal_Ingredients: updatedIngredients });
    };

    const handleFinishEditingIngredient = () => {
        submitHandler(editedMeal, index);
    };

    const longPressHandler = () => {
        setEditingMealName(true);
    };

    const expandHandler = () => {
        if (editedMeal.Meal_Ingredients && editedMeal.Meal_Ingredients.length > 0) // Check if there are ingredients
            setIsExpanded(!isExpanded);
    };

    return (
        <ColumnContainer >
            <Pressable 
                onPress={expandHandler}
                onLongPress={longPressHandler}
            >
                <RowContainer style={{justifyContent: "flex-start", padding:0}}>
                    {editedMeal.Meal_Ingredients && editedMeal.Meal_Ingredients.length > 0 ? 
                        <StyledText style={{fontSize:20, fontWeight:"bold", transform:[{rotate:rotateString}], paddingVertical:0}}>{"\u203A"}</StyledText> : 
                        null}
                    {editingMealName ?
                        <StyledTextInput 
                            style={{flex: 1,
                                fontSize: 15,
                                padding:5
                            }}
                            defaultValue={meal.Meal_Name}
                            onFinishEditing={handleFinishEditingName}
                            onChangeText={handleChangeMealName}
                            aria-label={`Meal Name Input ${index + 1}`}
                            placeholder='Enter a meal name...'
                        /> : 
                        <StyledText
                            style={{flex: 1,
                                fontSize: 15,
                                padding:0
                            }}
                            aria-label={`Meal Name Text ${index + 1}`}
                        >{meal.Meal_Name}</StyledText>
                    }
                </RowContainer>
            </Pressable>
            <ColumnContainer style={{ display: isExpanded ? "flex" : "none", padding:0 }}>
            {
                editedMeal.Meal_Ingredients?.map((ingredient, idx) =>
                    <RowContainer key={`ingredient-${index}-${idx}`} style={{padding:0}}>
                        <StyledText style={{
                                fontSize: 15,
                                paddingVertical: 0
                            }}>{"\u2022"}</StyledText>
                        <StyledTextInput
                            style={{ flex: 1,
                                fontSize: 15,
                                paddingVertical: 2
                            }}
                            defaultValue={ingredient.Ingredient_Name}
                            onFinishEditing={handleFinishEditingIngredient}
                            onChangeText={(text) => handleChangeIngredientText(text, idx)}
                            aria-label={`Ingredient Name Text Input ${idx + 1}`}
                            placeholder='Enter ingredient name...'
                        />
                    </RowContainer>
                )
            }
            </ColumnContainer>
        </ColumnContainer>
    );
}