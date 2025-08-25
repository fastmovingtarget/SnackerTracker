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
        setEditedMeal({ ...meal, Meal_Ingredients: [...(meal.Meal_Ingredients || []), { Ingredient_Name: "" }] });
    }, [meal]);

    const rotateString = isExpanded ? "90deg" : "0deg";

    const handleChangeMealName = (text: string) => {
        setEditedMeal({ ...editedMeal, Meal_Name: text });
    };
    
    const handleFinishEditingName = () => {
        if(editedMeal.Meal_Name.trim() === "") {
            setEditingMealName(true);
        } else {
            setEditingMealName(false);
        }
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

    return (
        <ColumnContainer >
            <Pressable 
                onPress={() => setIsExpanded(meal.Meal_Name !== "" && !isExpanded)/*Always set to false if the meal name is empty*/}
                onLongPress={longPressHandler}
            >
                <RowContainer style={{justifyContent: "flex-start"}}>
                    {meal.Meal_Name !== "" || (meal.Meal_Ingredients && meal.Meal_Ingredients.length > 0) ? 
                        <StyledText style={{fontSize:32, transform:[{rotate:rotateString}]}}>{"\u203A"}</StyledText> : 
                        null}
                    {editingMealName ?
                        <StyledTextInput 
                            style={{flex: 1,
                                fontSize: 15,
                            }}
                            defaultValue={meal.Meal_Name}
                            onFinishEditing={handleFinishEditingName}
                            onChangeText={handleChangeMealName}
                            aria-label={`Meal Name Input ${index + 1}`}
                            placeholder='Enter meal name'
                            autoFocus={true}
                        /> : 
                        <StyledText
                            style={{flex: 1,
                                fontSize: 15,
                            }}

                            aria-label={`Meal Name Text ${index + 1}`}
                        >{meal.Meal_Name}</StyledText>
                    }
                </RowContainer>
            </Pressable>
            <ColumnContainer style={{ display: isExpanded ? "flex" : "none" }}>
            {
                editedMeal.Meal_Ingredients?.map((ingredient, idx) =>
                    <RowContainer key={`ingredient-${index}-${idx}`}>
                        <StyledTextInput
                            style={{ flex: 1 }}
                            defaultValue={ingredient.Ingredient_Name}
                            onFinishEditing={handleFinishEditingIngredient}
                            onChangeText={(text) => handleChangeIngredientText(text, idx)}
                            aria-label={`Ingredient Name Text Input ${idx + 1}`}
                            placeholder='Enter ingredient name'
                        />
                    </RowContainer>
                )
            }
            </ColumnContainer>
        </ColumnContainer>
    );
}