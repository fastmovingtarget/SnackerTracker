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

describe('MealForm Component Renders', () => {
  it("Existing meal name", () => {
    const {getByLabelText} = render(<MealForm submitHandler={jest.fn()} meal={{Meal_Name: 'Breakfast'}} index={0} />);

    expect(getByLabelText(/Meal Name Input 1/i)).toHaveDisplayValue("Breakfast");
  })
});

describe('MealForm Component handles', () => {
  describe("Meal Name Text Input", () => {
    it('Changes value when blank', async () => {
      const user = userEvent.setup();

      const {getByLabelText} = render(<MealForm submitHandler={jest.fn()} meal={{Meal_Name: ''}} index={0} />);

      const inputField = getByLabelText(/Meal Name Input 1/i);

      // Simulate user typing into the input field
      await user.press(inputField);
      await user.type(inputField, 'Breakfast');
      
      // Check if the input field value has changed
      expect(getByLabelText(/Meal Name Input 1/i)).toHaveDisplayValue("Breakfast");
    });
    it('Changes value when editing an existing meal', async () => {
      const user = userEvent.setup();

      const {getByLabelText} = render(<MealForm submitHandler={jest.fn()} meal={{Meal_Name: 'Lunch'}} index={1} />);

      const inputField = getByLabelText(/Meal Name Input 2/i);

      // Simulate user typing into the input field
      await user.press(inputField);
      await user.type(inputField, 'yLunch');
      
      // Check if the input field value has changed
      expect(getByLabelText(/Meal Name Input 2/i)).toHaveDisplayValue("LunchyLunch");
    });
    it('Calls submitHandler with updated meal name on finish editing', async () => {
      const user = userEvent.setup();
      const mockSubmitHandler = jest.fn();

      const {getByText, getByLabelText} = render(<>
        <Text>BlurHelper</Text>
        <MealForm submitHandler={mockSubmitHandler} meal={{Meal_Name: 'Dinner'}} index={2} />
      </>);

      const inputField = getByLabelText(/Meal Name Input 3/i);

      // Simulate user typing into the input field
      await user.press(inputField);
      await user.type(inputField, 'y');

      // Check if the input field value has changed
      expect(getByLabelText(/Meal Name Input 3/i)).toHaveDisplayValue("Dinnery");

      // Check if submitHandler was called with the updated meal
      expect(mockSubmitHandler).toHaveBeenCalledWith({Meal_Name: 'Dinnery'} as Meal, 2);
    });
  });
});