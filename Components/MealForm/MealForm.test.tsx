//2025-06-05 : Added and tested meal name form
//2025-06-04 : Initial Commit with placeholder implementation

import { render, userEvent } from '@testing-library/react-native';
import MealForm from './MealForm';

describe('MealForm Component', () => {
  it('renders title text correctly', () => {
    const {getByText} = render(<MealForm />);
    expect(getByText('Meal Form')).toBeTruthy();
  });
  it("renders input field", () => {
    const {getByText, getByLabelText} = render(<MealForm />);

    expect(getByLabelText(/Meal Name Form/i)).toBeTruthy();
    expect(getByLabelText(/Meal Name Form/i)).toHaveDisplayValue("");
  })
});
describe('MealForm Component handles', () => {
  it('input field changes', async () => {
    const user = userEvent.setup();

    const {getByLabelText} = render(<MealForm />);
    const inputField = getByLabelText(/Meal Name Form/i);

    // Simulate user typing into the input field
    await user.press(inputField);
    await user.type(inputField, 'Breakfast');
    
    // Check if the input field value has changed
    expect(getByLabelText(/Meal Name Form/i)).toHaveDisplayValue("Breakfast");
  });
});