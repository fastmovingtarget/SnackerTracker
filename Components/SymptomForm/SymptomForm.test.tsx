//2025-06-05 : Symptom form now actually has some text input, tested
//2025-06-04 : Initial Commit with placeholder implementation
import { render, userEvent } from '@testing-library/react-native';
import SymptomForm from './SymptomForm';

describe('SymptomForm', () => {
  it('renders correctly', () => {
    const { getByText } = render(<SymptomForm />);
    expect(getByText('Symptom Form')).toBeTruthy();
  });
  it("renders symptom name text input", () => {
    const { getByLabelText } = render(<SymptomForm />);
    expect(getByLabelText(/Symptom Name Form/i)).toBeTruthy();
    expect(getByLabelText(/Symptom Name Form/i)).toHaveDisplayValue("");
  });
  it("renders symptom description text input", () => {
    const { getByLabelText } = render(<SymptomForm />);
    expect(getByLabelText(/Symptom Description Form/i)).toBeTruthy();
    expect(getByLabelText(/Symptom Description Form/i)).toHaveDisplayValue("");
  })

})
describe('SymptomForm handles', () => {
  it('input field changes', async () => {
    const user = userEvent.setup();
    const { getByLabelText } = render(<SymptomForm />);
    const symptomNameInput = getByLabelText(/Symptom Name Form/i);
    const symptomDescriptionInput = getByLabelText(/Symptom Description Form/i);

    // Simulate user typing into the symptom name input field
    await user.press(symptomNameInput);
    await user.type(symptomNameInput, 'Headache');
    
    // Check if the input field value has changed
    expect(getByLabelText(/Symptom Name Form/i)).toHaveDisplayValue("Headache");

    // Simulate user typing into the symptom description input field
    await user.press(symptomDescriptionInput);
    await user.type(symptomDescriptionInput, 'Mild headache in the evening');
    
    // Check if the input field value has changed
    expect(getByLabelText(/Symptom Description Form/i)).toHaveDisplayValue("Mild headache in the evening");
  });
})