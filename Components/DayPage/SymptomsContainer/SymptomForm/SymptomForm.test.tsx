//2025-08-26 : Added symptom description field back in
//2025-08-23 : Symptom form now contains only text input
//2025-06-05 : Symptom form now actually has some text input, tested
//2025-06-04 : Initial Commit with placeholder implementation
import { render, userEvent } from '@testing-library/react-native';
import SymptomForm from './SymptomForm';

const testSymptom = { Symptom_Name: "Headache", Symptom_Description: "Mild headache in the evening" };

describe('SymptomForm', () => {
  it("renders symptom name text input", () => {
    const { getByLabelText } = render(<SymptomForm submitHandler={jest.fn()} symptom={testSymptom} index={0} />);
    expect(getByLabelText(/Symptom Name Input 1/i)).toBeTruthy();
    expect(getByLabelText(/Symptom Name Input 1/i)).toHaveDisplayValue(testSymptom.Symptom_Name);
  });
  it("renders symptom description text input", () => {
    const { getByLabelText } = render(<SymptomForm submitHandler={jest.fn()} symptom={testSymptom} index={0} />);
    expect(getByLabelText(/Symptom Description Input 1/i)).toBeTruthy();
    expect(getByLabelText(/Symptom Description Input 1/i)).toHaveDisplayValue(testSymptom.Symptom_Description);
  })

})
describe('SymptomForm handles', () => {
  it('name input field changes', async () => {
    const user = userEvent.setup();
    const { getByLabelText } = render(<SymptomForm submitHandler={jest.fn()} symptom={testSymptom} index={0} />);
    const symptomNameInput = getByLabelText(/Symptom Name Input 1/i);

    // Simulate user typing into the symptom name input field
    await user.press(symptomNameInput);
    await user.type(symptomNameInput, 'Headache');
    
    // Check if the input field value has changed
    expect(getByLabelText(/Symptom Name Input 1/i)).toHaveDisplayValue("HeadacheHeadache");
  });
  it("description input field changes", async () => {
    const user = userEvent.setup();
    const { getByLabelText } = render(<SymptomForm submitHandler={jest.fn()} symptom={testSymptom} index={0} />);
    const symptomDescriptionInput = getByLabelText(/Symptom Description Input 1/i);

    // Simulate user typing into the symptom description input field
    await user.press(symptomDescriptionInput);
    await user.type(symptomDescriptionInput, 'Mild headache in the evening');

    // Check if the input field value has changed
    expect(getByLabelText(/Symptom Description Input 1/i)).toHaveDisplayValue("Mild headache in the eveningMild headache in the evening");
  });
})