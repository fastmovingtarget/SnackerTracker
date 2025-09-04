//2025-08-23 : Added Meal Ingredients Array
//2025-06-03 : Initialising basic type implementation
export default interface Meal {
    Meal_Name: string;
    Meal_Ingredients?: MealIngredient[];
}

export interface MealIngredient {
    Ingredient_Name: string;
}