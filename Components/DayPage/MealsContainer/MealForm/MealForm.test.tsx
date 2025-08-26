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

    expect(getByLabelText(/Meal Name Text 1/i)).toHaveTextContent("Breakfast");
  })
  it("Blank meal name as form", () => {
    const {getByLabelText} = render(<MealForm submitHandler={jest.fn()} meal={{Meal_Name: ''}} index={0} />);

    expect(getByLabelText(/Meal Name Input 1/i)).toHaveDisplayValue("");
  })
  it("Collapsible chevron when there are ingredients", () => {
    const { getByText } = render(<MealForm submitHandler={jest.fn()} meal={{ Meal_Name: 'Breakfast', Meal_Ingredients: [{ Ingredient_Name: 'Eggs' }] }} index={0} />);

    expect(getByText(/\u203A/i)).toBeTruthy();
  });
  it("No Collapsible chevron when there are no ingredients and name is blank", () => {
    const { queryByText } = render(<MealForm submitHandler={jest.fn()} meal={{ Meal_Name: '', Meal_Ingredients: [] }} index={0} />);
    expect(queryByText(/\u203A/i)).toBeNull();
  });
});

describe('MealForm Component handles', () => {
  describe("Meal Name Text Input", () => {
    it('Appears initially when meal name is blank, Changes value then no longer appears when user is finished editing', async () => {
      const user = userEvent.setup();

      const submitHandlerMock = jest.fn();

      const {getByLabelText, queryByLabelText} = render(<MealForm submitHandler={submitHandlerMock} meal={{Meal_Name: ''}} index={0} />);

      expect(getByLabelText(/Meal Name Input 1/i)).toHaveDisplayValue("");

      const inputField = getByLabelText(/Meal Name Input 1/i);
      expect(inputField).toHaveDisplayValue("");

      expect(submitHandlerMock).not.toHaveBeenCalled();

      // Simulate user typing into the input field
      await user.press(inputField);
      await user.type(inputField, 'Breakfast');

      expect(submitHandlerMock).toHaveBeenCalledWith({Meal_Name: 'Breakfast'} as Meal, 0);
      expect(queryByLabelText(/Meal Name Input 1/i)).toBeNull();
    });
    it('Doesn\'t appear initially, Changes value when editing an existing meal, no longer appears when user is finished editing', async () => {
      const user = userEvent.setup();
      const submitHandlerMock = jest.fn();

      const {getByLabelText, queryByLabelText} = render(<MealForm submitHandler={submitHandlerMock} meal={{Meal_Name: 'Lunch'}} index={1} />);
      expect(queryByLabelText(/Meal Name Input 2/i)).toBeNull();

      const text = getByLabelText(/Meal Name Text 2/i);
      await user.longPress(text);

      const inputField = getByLabelText(/Meal Name Input 2/i);

      // Simulate user typing into the input field
      await user.press(inputField);
      await user.type(inputField, 'yLunch');
      
      // Check if the input field value has changed
      expect(submitHandlerMock).toHaveBeenCalledWith({Meal_Name: 'LunchyLunch', Meal_Ingredients:[{Ingredient_Name:""}]} as Meal, 1);
      expect(queryByLabelText(/Meal Name Input 2/i)).toBeNull();
    });
  });
  describe("Meal Collapsible", () => {
    it('Expands to show ingredients when ingredients exist', async () => {
      const user = userEvent.setup();
      const submitHandlerMock = jest.fn();

      const { getByLabelText, queryByLabelText } = render(<MealForm submitHandler={submitHandlerMock} meal={{ Meal_Name: 'Dinner', Meal_Ingredients: [{ Ingredient_Name: 'Chicken' }] }} index={2} />);

      const header = getByLabelText(/Meal Name Text 3/i);
      await user.press(header);

      expect(getByLabelText(/Ingredient Name Text Input 1/i)).toBeTruthy();

      await user.press(header);
      expect(queryByLabelText(/Ingredient Name Text Input 1/i)).toBeNull();
    });
    it('Does nothing when ingredients do not exist or are empty array', async () => {
      const user = userEvent.setup();
      const submitHandlerMock = jest.fn();

      const { getByLabelText, queryByLabelText } = render(<MealForm submitHandler={submitHandlerMock} meal={{ Meal_Name: '', Meal_Ingredients: [] }} index={2} />);

      const header = getByLabelText(/Meal Name Input 3/i);
      await user.press(header);

      expect(queryByLabelText(/Ingredient Name Text Input 1/i)).toBeNull();
    });
  });
  describe("Ingredients", () => {
    it('Existing values can be changed, and display and submit correctly', async () => {
      const user = userEvent.setup();
      const submitHandlerMock = jest.fn();

      const { getByLabelText, queryByLabelText } = render(<MealForm submitHandler={submitHandlerMock} meal={{ Meal_Name: 'Dinner', Meal_Ingredients: [{ Ingredient_Name: 'Chicken' }] }} index={2} />);

      const header = getByLabelText(/Meal Name Text 3/i);
      await user.press(header);

      expect(getByLabelText(/Ingredient Name Text Input 2/i)).toBeTruthy();
      await user.type(getByLabelText(/Ingredient Name Text Input 1/i), 'Rice');
      expect(getByLabelText(/Ingredient Name Text Input 1/i)).toHaveDisplayValue("ChickenRice");
      expect(submitHandlerMock).toHaveBeenCalledWith({ Meal_Name: 'Dinner', Meal_Ingredients: [{ Ingredient_Name: 'ChickenRice' }, { Ingredient_Name: "" }] } as Meal, 2);
    });
  });
});