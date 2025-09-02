//2025-09-02 : Added New Meal input from MealForm
//2025-08-27 : Adding in a titled container for each section
//2025-08-25 : Displayed meals fixed to change when date is changed
//2025-08-23 : Container for the meal input forms
import Meal from '../../../Types/Meal';
import React from 'react';
import MealForm from './MealForm/MealForm';
import TitledContainer from '../../../CustomComponents/TitledContainer';
import StyledTextInput from '../../../CustomComponents/StyledTextInput';
import RowContainer from '../../../CustomComponents/RowContainer';

export default function MealsContainer({ meals, onSubmit }: { meals: Meal[], onSubmit: (newMeals: (Meal[])) => void }) {

    const [displayMeals, setDisplayMeals] = React.useState<Meal[]>([...meals]); // Add an empty meal for new entries

    React.useEffect(() => {
        setDisplayMeals([...meals]);
    }, [meals]);

    const submitHandler = (newMeal: Meal, index: number) => {
        let updatedMeals = [...displayMeals];

        newMeal.Meal_Ingredients = newMeal.Meal_Ingredients?.filter(ingredient => ingredient.Ingredient_Name.trim() !== ''); // Remove empty ingredients

        updatedMeals[index] = newMeal; // update the meal at the specified index

        updatedMeals = updatedMeals.filter(meal => meal.Meal_Name !== '' || (meal.Meal_Ingredients && meal.Meal_Ingredients.length > 0));// Remove empty meals

        onSubmit(updatedMeals);

        setDisplayMeals([...updatedMeals]);
    };

    const submitNewMealHandler = (newMealName: string) => {
        if (newMealName.trim() === '') return;

        const newMeal: Meal = {
            Meal_Name: newMealName,
            Meal_Ingredients: []
        };
        onSubmit([...displayMeals, newMeal]);
        setDisplayMeals([...displayMeals, newMeal]);
    };

    return (
        <TitledContainer title="Meals">
            {displayMeals.map((meal, index) => (
                <MealForm key={index} meal={meal} index={index} submitHandler={submitHandler} />
            ))}
            <RowContainer>
                <StyledTextInput
                    style={{
                        flex: 1,
                        fontSize: 15,
                        padding: 5
                    }}
                    placeholder="Add a new meal..."
                    onFinishEditing={submitNewMealHandler}
                    aria-label='New Meal Name Input'
                />
            </RowContainer>
        </TitledContainer>
    );
}
