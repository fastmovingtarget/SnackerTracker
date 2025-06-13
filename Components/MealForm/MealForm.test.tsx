//2025-06-13 : Testing form submission handling
//2025-06-12 : Minor text editing
//2025-06-05 : Added and tested meal name form
//2025-06-04 : Initial Commit with placeholder implementation

import { render, userEvent } from '@testing-library/react-native';
import MealForm from './MealForm';

describe('MealForm Component', () => {
  it('renders title text correctly', () => {
    const {getByText} = render(<MealForm submitHandler={jest.fn()} />);
    expect(getByText('Meals Form')).toBeTruthy();
  });
  it("renders input field", () => {
    const {getByText, getByLabelText} = render(<MealForm submitHandler={jest.fn()} />);

    expect(getByLabelText(/Meal Name Form/i)).toBeTruthy();
    expect(getByLabelText(/Meal Name Form/i)).toHaveDisplayValue("");
  })
  it("renders submit button", () => {
    const {getByText, getByLabelText} = render(<MealForm submitHandler={jest.fn()} />);

    expect(getByText(/Submit/i)).toBeTruthy();
  })
});
describe('MealForm Component handles', () => {
  it('input field changes', async () => {
    const user = userEvent.setup();

    const {getByLabelText} = render(<MealForm submitHandler={jest.fn()} />);
    const inputField = getByLabelText(/Meal Name Form/i);

    // Simulate user typing into the input field
    await user.press(inputField);
    await user.type(inputField, 'Breakfast');
    
    // Check if the input field value has changed
    expect(getByLabelText(/Meal Name Form/i)).toHaveDisplayValue("Breakfast");
  });
  it('submit button press', async () => {
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
  it('submit button submits input text', async () => {
    const user = userEvent.setup();
    const mockSubmitHandler = jest.fn();

    const {getByText, getByLabelText} = render(<MealForm submitHandler={mockSubmitHandler} />);
    const submitButton = getByText(/Submit/i);

    const inputField = getByLabelText(/Meal Name Form/i);

    // Simulate user typing into the input field
    await user.press(inputField);
    await user.type(inputField, 'Breakfast');

    // Simulate user pressing the submit button
    await user.press(submitButton);

    // Check if the button press was handled (e.g., by checking if a function was called)
    // This would require mocking the submit function in MealForm, which is not shown here.
    expect(mockSubmitHandler).toHaveBeenCalledTimes(1);
    expect(mockSubmitHandler).toHaveBeenCalledWith('Breakfast');
  })
});