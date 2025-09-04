//2025-09-02 : Cleaned collapsible logic, editable text, moved new meal to Container
//2025-08-26 : Improved testing for collapsible functionality
//2025-08-25 : Meal Form expands to show meal ingredients
//2025-08-23 : Meal Form now only contains text input
//2025-08-19 : Meal Form now has handling for edit and delete buttons
//2025-06-13 : Testing form submission handling
//2025-06-12 : Minor text editing
//2025-06-05 : Added and tested meal name form
//2025-06-04 : Initial Commit with placeholder implementation

import { render, userEvent } from '@testing-library/react-native';
import { TextInput, Text } from 'react-native';
import MealForm from './MealForm';
import type Meal from '../../../../Types/Meal';
import { use } from 'react';

describe('MealForm Component Renders', () => {
  it("Existing meal name as text", () => {
    const {getByLabelText} = render(<MealForm submitHandler={jest.fn()} meal={{Meal_Name: 'Breakfast'}} index={0} />);

    expect(getByLabelText(/Meal Name 1 Text/i)).toHaveTextContent("Breakfast");
  })
  it("Collapsible chevron when there are ingredients", () => {
    const { getByText } = render(<MealForm submitHandler={jest.fn()} meal={{ Meal_Name: 'Breakfast', Meal_Ingredients: [{ Ingredient_Name: 'Eggs' }] }} index={0} />);

    expect(getByText(/\u203A/i)).toBeTruthy();
  });
});

describe('MealForm Component handles', () => {
  describe("Meal Name Text Input", () => {
    it('Doesn\'t appear initially, Changes value when editing an existing meal, no longer appears when user is finished editing', async () => {
      const user = userEvent.setup();
      const submitHandlerMock = jest.fn();

      const {getByLabelText, queryByLabelText} = render(<MealForm submitHandler={submitHandlerMock} meal={{Meal_Name: 'Lunch'}} index={1} />);
      expect(queryByLabelText(/Meal Name 2 Input/i)).toBeNull();

      const text = getByLabelText(/Meal Name 2 Text/i);
      await user.longPress(text);

      const inputField = getByLabelText(/Meal Name 2 Input/i);

      // Simulate user typing into the input field
      await user.press(inputField);
      await user.type(inputField, 'yLunch');
      
      // Check if the input field value has changed
      expect(submitHandlerMock).toHaveBeenCalledWith({Meal_Name: 'LunchyLunch'} as Meal, 1);
      expect(queryByLabelText(/Meal Name 2 Input/i)).toBeNull();
    });
  });
  describe("Meal Collapsible", () => {
    it('Expands to show ingredients when ingredients exist', async () => {
      const user = userEvent.setup();
      const submitHandlerMock = jest.fn();

      const { getByLabelText, queryByLabelText } = render(<MealForm submitHandler={submitHandlerMock} meal={{ Meal_Name: 'Dinner', Meal_Ingredients: [{ Ingredient_Name: 'Chicken' }] }} index={2} />);

      const header = getByLabelText(/Meal Name 3 Text/i);
      await user.press(header);

      expect(getByLabelText(/Ingredient Name 1 Text/i)).toBeTruthy();

      await user.press(header);
      expect(queryByLabelText(/Ingredient Name 1 Text/i)).toBeNull();
    });
    it('Does nothing when ingredients do not exist or are empty array', async () => {
      const user = userEvent.setup();
      const submitHandlerMock = jest.fn();

      const { getByLabelText, queryByLabelText } = render(<MealForm submitHandler={submitHandlerMock} meal={{ Meal_Name: 'Breakfast', Meal_Ingredients: [] }} index={2} />);

      const header = getByLabelText(/Meal Name 3 Text/i);
      await user.press(header);

      expect(queryByLabelText(/Ingredient Name 1 Input/i)).toBeNull();
    });
  });
  describe("Ingredients", () => {
    it('Existing values can be changed, and display and submit correctly', async () => {
      const user = userEvent.setup();
      const submitHandlerMock = jest.fn();

      const { getByLabelText } = render(<MealForm submitHandler={submitHandlerMock} meal={{ Meal_Name: 'Dinner', Meal_Ingredients: [{ Ingredient_Name: 'Chicken' }] }} index={2} />);

      const header = getByLabelText(/Meal Name 3 Text/i);
      await user.press(header);
      await user.press(getByLabelText(/Ingredient Name 1 Text/i));

      await user.type(getByLabelText(/Ingredient Name 1 Input/i), 'Rice');
      expect(getByLabelText(/Ingredient Name 1 Text/i)).toHaveTextContent("ChickenRice");
      expect(submitHandlerMock).toHaveBeenCalledWith({ Meal_Name: 'Dinner', Meal_Ingredients: [{ Ingredient_Name: 'ChickenRice' }] } as Meal, 2);
    });
    it('New values can be added, and display and submit correctly', async () => {
      const user = userEvent.setup();
      const submitHandlerMock = jest.fn();

      const { getByLabelText } = render(<MealForm submitHandler={submitHandlerMock} meal={{ Meal_Name: 'Dinner', Meal_Ingredients: [{ Ingredient_Name: 'Chicken' }] }} index={2} />);

      const header = getByLabelText(/Meal Name 3 Text/i);
      await user.press(header);

      await user.type(getByLabelText(/New Ingredient Name Input/i), 'Rice');
      expect(submitHandlerMock).toHaveBeenCalledWith({ Meal_Name: 'Dinner', Meal_Ingredients: [{ Ingredient_Name: 'Chicken' }, { Ingredient_Name: 'Rice' }] } as Meal, 2);
    });
  });
});