//2025-08-25 : Displayed meals fixed to change when date is changed
//2025-08-23 : Container for the meal input forms
import Meal from '../../../Types/Meal';
import React from 'react';
import MealForm from './MealForm/MealForm';

export default function MealsContainer({ meals, onSubmit }: { meals: Meal[], onSubmit: (newMeals: (Meal[])) => void }) {

    const [displayMeals, setDisplayMeals] = React.useState<Meal[]>([...meals, {Meal_Name: ''}]); // Add an empty meal for new entries

    React.useEffect(() => {
        setDisplayMeals([...meals, {Meal_Name: ''}]);
    }, [meals]);

    const submitHandler = (newMeal: Meal, index: number) => {
        let updatedMeals = [...displayMeals];

        newMeal.Meal_Ingredients = newMeal.Meal_Ingredients?.filter(ingredient => ingredient.Ingredient_Name.trim() !== ''); // Remove empty ingredients

        updatedMeals[index] = newMeal; // update the meal at the specified index

        updatedMeals = updatedMeals.filter(meal => meal.Meal_Name !== '' || (meal.Meal_Ingredients && meal.Meal_Ingredients.length > 0));// Remove empty meals

        onSubmit(updatedMeals);

        setDisplayMeals([...updatedMeals, {Meal_Name: '', Meal_Ingredients: []}]); // Ensure there's always an empty meal at the end
    };

    return (
        <>
            {displayMeals.map((meal, index) => (
                <MealForm key={index} meal={meal} index={index} submitHandler={submitHandler} />
            ))}
        </>
    );
}
