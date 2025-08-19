//2025-08-19 : Meal Form now has handling for edit and delete buttons
//2025-06-13 : Testing form submission handling
//2025-06-12 : Minor text editing
//2025-06-05 : Added and tested meal name form
//2025-06-04 : Initial Commit with placeholder implementation

import { render, userEvent } from '@testing-library/react-native';
import MealForm from './MealForm';
import type Meal from '../../Types/Meal';

describe('MealForm Component', () => {
  it("renders existing meal names", () => {
    const mockMeals : Meal[] = [{Meal_Name:'Breakfast'}, {Meal_Name:'Lunch'}, {Meal_Name:'Dinner'}];
    const {getByText} = render(<MealForm submitHandler={jest.fn()} existingMeals={mockMeals} />);

    mockMeals.forEach(meal => {
      expect(getByText(meal.Meal_Name)).toBeTruthy();
    });
  })
  it("renders edit button for existing meals", () => {
    const mockMeals : Meal[] = [{Meal_Name:'Breakfast'}, {Meal_Name:'Lunch'}, {Meal_Name:'Dinner'}];
    const {getAllByText} = render(<MealForm submitHandler={jest.fn()} existingMeals={mockMeals} />);

    mockMeals.forEach(meal => {
      expect(getAllByText(/Edit/i)).toHaveLength(3);
    });
  });
  it("renders delete button for existing meals", () => { 
    const mockMeals : Meal[] = [{Meal_Name:'Breakfast'}, {Meal_Name:'Lunch'}, {Meal_Name:'Dinner'}];
    const {getAllByText} = render(<MealForm submitHandler={jest.fn()} existingMeals={mockMeals} />);

    mockMeals.forEach(meal => {
      expect(getAllByText(/Delete/i)).toHaveLength(3);
    });
  });
  it("renders add new meal button", () => {
    const {getByText} = render(<MealForm submitHandler={jest.fn()} />);
    expect(getByText(/Add New Meal/i)).toBeTruthy();
  });
  it("does not render edit and delete buttons when no meals are provided", () => {
    const {queryAllByText} = render(<MealForm submitHandler={jest.fn()} />);

    expect(queryAllByText(/Edit/i)).toHaveLength(0);
    expect(queryAllByText(/Delete/i)).toHaveLength(0);
  });
  it("renders done button when editing a meal", async () => {
    const user = userEvent.setup();

    const mockMeals : Meal[] = [{Meal_Name:'Breakfast'}, {Meal_Name:'Lunch'}, {Meal_Name:'Dinner'}];
    const {getAllByText} = render(<MealForm submitHandler={jest.fn()} existingMeals={mockMeals} />);

    // Simulate entering edit mode for the first meal
    const editButton = getAllByText(/Edit/i)[0];

    await user.press(editButton);

    expect(getAllByText(/Done/i)).toHaveLength(1);
    expect(getAllByText(/Edit/i)).toHaveLength(2);
    expect(getAllByText(/Delete/i)).toHaveLength(2);
  });
  it("renders input field when editing a meal", async () => {
    const user = userEvent.setup();

    const mockMeals : Meal[] = [{Meal_Name:'Breakfast'}, {Meal_Name:'Lunch'}, {Meal_Name:'Dinner'}];
    const {getAllByText, getByLabelText} = render(<MealForm submitHandler={jest.fn()} existingMeals={mockMeals} />);

    // Simulate entering edit mode for the first meal
    const editButton = getAllByText(/Edit/i)[0];

    await user.press(editButton);

    expect(getByLabelText(/Meal [0-9]+ Input/i)).toBeTruthy();
    expect(getByLabelText(/Meal [0-9]+ Input/i)).toHaveDisplayValue("Breakfast");
  })
});
describe('MealForm Component handles', () => {
  describe("Button Presses", () => {
    it.skip('submit', async () => {
      const user = userEvent.setup();
      const mockSubmitHandler = jest.fn();

      const {getByText} = render(<MealForm submitHandler={mockSubmitHandler} />);
      const submitButton = getByText(/Submit/i);

      // Simulate user pressing the submit button
      await user.press(submitButton);

      // Check if the button press was handled (e.g., by checking if a function was called)
      // This would require mocking the submit function in MealForm, which is not shown here.
      expect(mockSubmitHandler).toHaveBeenCalledTimes(1);
    })
    it('Add New Recipe', async () => {
      const user = userEvent.setup();

      const mockMeals : Meal[] = [{Meal_Name:'Breakfast'}, {Meal_Name:'Lunch'}, {Meal_Name:'Dinner'}];
      const {getAllByText, getByText, getByLabelText} = render(<MealForm submitHandler={jest.fn()} existingMeals={mockMeals} />);
      
      const addNewButton = getByText(/Add New Meal/i);
      // Simulate user pressing the add new meal button
      await user.press(addNewButton);

      expect(getAllByText(/Edit/i)).toHaveLength(3); // Existing meals should still have edit buttons
      expect(getAllByText(/Delete/i)).toHaveLength(3); // Existing meals
      expect(getAllByText(/Add New Meal/i)).toHaveLength(1); // Add new meal button should still be present
      expect(getAllByText(/Done/i)).toHaveLength(1); // New meal should have a done button
      expect(getByLabelText(/Meal [0-9]+ Input/i)).toBeTruthy(); // Input field should be present
      expect(getByLabelText(/Meal [0-9]+ Input/i)).toHaveDisplayValue(""); // Input field should be empty
    })
    it("Delete Meal", async () => {
      const user = userEvent.setup();

      const mockSubmitHandler = jest.fn();
      const mockMeals : Meal[] = [{Meal_Name:'Breakfast'}, {Meal_Name:'Lunch'}, {Meal_Name:'Dinner'}];
      const expectedSubmittedMeals = [{Meal_Name:'Lunch'}, {Meal_Name:'Dinner'}];
      const {getAllByText, queryByText} = render(<MealForm submitHandler={mockSubmitHandler} existingMeals={mockMeals} />);

      const deleteButtons = getAllByText(/Delete/i);
      expect(deleteButtons).toHaveLength(3); // Initially 3 delete buttons

      // Simulate user pressing the delete button for the first meal
      await user.press(deleteButtons[0]);

      // Should submit the updated meals
      expect(mockSubmitHandler).toHaveBeenCalledTimes(1);
      expect(mockSubmitHandler).toHaveBeenCalledWith("Meals", expectedSubmittedMeals);
    })
    it("Done Meal Edit", async () => {
      const user = userEvent.setup();
      const mockMeals : Meal[] = [{Meal_Name:'Breakfast'}, {Meal_Name:'Lunch'}, {Meal_Name:'Dinner'}];

      const {getByLabelText, getAllByText, getByText} = render(<MealForm submitHandler={jest.fn()} existingMeals={mockMeals} />);

      const editButton = getAllByText(/Edit/i)[1];
      // Simulate user pressing the add new meal button
      await user.press(editButton);

      const inputField = getByLabelText(/Meal [0-9]+ Input/i);

      // Simulate user typing into the input field
      await user.press(inputField);
      await user.type(inputField, 'yLunch');
      
      // Check if the input field value has changed
      expect(getByLabelText(/Meal [0-9]+ Input/i)).toHaveDisplayValue("LunchyLunch");

      const doneButton = getByText(/Done/i);
      // Simulate user pressing the cancel button
      await user.press(doneButton);

      expect(getAllByText(/Edit/i)).toHaveLength(3); // Edit buttons should still be present
      expect(getAllByText(/Delete/i)).toHaveLength(3); // Delete buttons should still be present
      expect(getByText("LunchyLunch")).toBeTruthy(); // The new meal name should still be present
    })
    it.skip("Edit button edits correct meal", async () => {
      const user = userEvent.setup();

      const mockMeals : Meal[] = [{Meal_Name:'Breakfast'}, {Meal_Name:'Lunch'}, {Meal_Name:'Dinner'}];
      const {getAllByText, getByLabelText, getByText} = render(<MealForm submitHandler={jest.fn()} existingMeals={mockMeals} />);

      const editButton = getAllByText(/Edit/i)[1];
      // Simulate user pressing the add new meal button
      await user.press(editButton);

      expect(getAllByText(/Edit/i)).toHaveLength(2); // Existing meals should still have edit buttons
      expect(getAllByText(/Delete/i)).toHaveLength(2); // Existing meals
      expect(getByText(/Breakfast/i)).toBeTruthy(); // 
      expect(getByText(/Dinner/i)).toBeTruthy(); // Breakfast and Dinner should still be present
      expect(getByLabelText(/Meal Name Form/i)).toBeTruthy(); // Input field should be present
      expect(getByLabelText(/Meal Name Form/i)).toHaveDisplayValue("Lunch"); // Input field should have the correct value
    })
    it.skip("Edit button inert while editing another recipe", async () => {
      const user = userEvent.setup();

      const mockMeals : Meal[] = [{Meal_Name:'Breakfast'}, {Meal_Name:'Lunch'}, {Meal_Name:'Dinner'}];
      const {getAllByText, getByLabelText, getByText} = render(<MealForm submitHandler={jest.fn()} existingMeals={mockMeals} />);

      const editButton = getAllByText(/Edit/i)[1];
      // Simulate user pressing the edit button on a meal
      await user.press(editButton);

      const editButton2 = getAllByText(/Edit/i)[0];
      // Simulate user pressing the edit button on another meal
      await user.press(editButton2);

      expect(getAllByText(/Edit/i)).toHaveLength(2); // Existing meals should still have edit buttons
      expect(getAllByText(/Delete/i)).toHaveLength(2); // Existing meals
      expect(getByText(/Breakfast/i)).toBeTruthy(); // 
      expect(getByText(/Dinner/i)).toBeTruthy(); // Breakfast and Dinner should still be present
      expect(getByLabelText(/Meal Name Form/i)).toBeTruthy(); // Input field should be present
      expect(getByLabelText(/Meal Name Form/i)).toHaveDisplayValue("Lunch"); // Input field should have the correct value
    })
    it.skip('Add New Recipe inert while editing another recipe', async () => {
      const user = userEvent.setup();

      const mockMeals : Meal[] = [{Meal_Name:'Breakfast'}, {Meal_Name:'Lunch'}, {Meal_Name:'Dinner'}];
      const {getAllByText, getByText, getByLabelText } = render(<MealForm submitHandler={jest.fn()} existingMeals={mockMeals} />);

      const editButton = getAllByText(/Edit/i)[1];
      // Simulate user pressing the add new meal button
      await user.press(editButton);
      
      const addNewButton = getByText(/Add New Meal/i);
      // Simulate user pressing the add new meal button
      await user.press(addNewButton);

      expect(getAllByText(/Edit/i)).toHaveLength(2); // Existing meals should still have edit buttons
      expect(getAllByText(/Delete/i)).toHaveLength(2); // Existing meals
      expect(getByText(/Done/i)).toBeTruthy(); // New meal should have a done button
      expect(getByText(/Cancel/i)).toBeTruthy(); // New meal should have a cancel button
      expect(getByLabelText(/Meal Name Form/i)).toBeTruthy(); // Input field should be present
    })
  })
  describe.skip("Meal Name Form", () => {
    it('input field changes when blank', async () => {
      const user = userEvent.setup();

      const {getByLabelText, getByText} = render(<MealForm submitHandler={jest.fn()} existingMeals={[]} />);

      const addNewButton = getByText(/Add New Meal/i);
      // Simulate user pressing the add new meal button
      await user.press(addNewButton);

      const inputField = getByLabelText(/Meal Name Form/i);

      // Simulate user typing into the input field
      await user.press(inputField);
      await user.type(inputField, 'Breakfast');
      
      // Check if the input field value has changed
      expect(getByLabelText(/Meal Name Form/i)).toHaveDisplayValue("Breakfast");
    });
    it('input field changes when editing an existing meal', async () => {
      const user = userEvent.setup();
      const mockMeals : Meal[] = [{Meal_Name:'Breakfast'}, {Meal_Name:'Lunch'}, {Meal_Name:'Dinner'}];

      const {getByLabelText, getAllByText} = render(<MealForm submitHandler={jest.fn()} existingMeals={mockMeals} />);

      const editButton = getAllByText(/Edit/i)[1];
      // Simulate user pressing the add new meal button
      await user.press(editButton);

      const inputField = getByLabelText(/Meal Name Form/i);

      // Simulate user typing into the input field
      await user.press(inputField);
      await user.type(inputField, 'yLunch');
      
      // Check if the input field value has changed
      expect(getByLabelText(/Meal Name Form/i)).toHaveDisplayValue("LunchyLunch");
    });
  });
});