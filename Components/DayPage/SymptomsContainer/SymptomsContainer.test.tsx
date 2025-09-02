//2025-09-02 : Moved new symptom name form from SymptomForm
//2025-08-26 : Fixed mock symptom form
//2025-08-23 : Container for the symptom input forms


import { render, userEvent } from '@testing-library/react-native';
import { Text, Pressable } from 'react-native';
import SymptomsContainer from './SymptomsContainer';
import SymptomForm from './SymptomForm/SymptomForm';
import Symptom from '../../../Types/Symptom';

jest.mock("./SymptomForm/SymptomForm", () => {
  return {
    __esModule: true,
    default: jest.fn()
  }
});

beforeEach(() => {
  jest.resetAllMocks();
  (SymptomForm as jest.Mock).mockImplementation(({ submitHandler, symptom, index }) => {
    return (
      <Pressable onPress={() => {submitHandler(symptom, index)}}>
        <Text>{symptom.Symptom_Name || 'Symptom Form'}</Text>
      </Pressable>
    );
  });
});

describe('SymptomsContainer Component Renders', () => {
  it("existing symptom form components", () => {
    const mockSymptoms : Symptom[] = [{Symptom_Name:'Headache'}, {Symptom_Name:'Nausea'}, {Symptom_Name:'Fatigue'}];
    render(<SymptomsContainer onSubmit={jest.fn()} symptoms={mockSymptoms} />);

    expect(SymptomForm).toHaveBeenCalledWith(expect.objectContaining({
      symptom: { Symptom_Name: 'Headache' }
    }), undefined);
    expect(SymptomForm).toHaveBeenCalledWith(expect.objectContaining({
      symptom: { Symptom_Name: 'Nausea' }
    }), undefined);
    expect(SymptomForm).toHaveBeenCalledWith(expect.objectContaining({
      symptom: { Symptom_Name: 'Fatigue' }
    }), undefined);
  })
  it("new symptom input", () => {
    const { getByLabelText } = render(<SymptomsContainer onSubmit={jest.fn()} symptoms={[]} />);

    expect(getByLabelText(/New Symptom Name Input/i)).toBeTruthy();
  });
});
describe('SymptomsContainer Component Functionality', () => {
  it("submits Symptoms", async () => {
    const user = userEvent.setup();
    const mockSymptoms: Symptom[] = [{ Symptom_Name: 'Headache' }, { Symptom_Name: 'Nausea' }];
    const mockOnSubmit = jest.fn();
    const {getByText} = render(<SymptomsContainer onSubmit={mockOnSubmit} symptoms={mockSymptoms} />);

    // Simulate filling out the symptom form and submitting
    await user.press(getByText('Headache'));

    expect(mockOnSubmit).toHaveBeenCalledWith([
      { Symptom_Name: 'Headache' },
      { Symptom_Name: 'Nausea' }
    ]);

    expect(SymptomForm as jest.Mock).toHaveBeenCalledWith(expect.objectContaining({
      symptom: { Symptom_Name: 'Headache' }
    }), undefined);
    expect(SymptomForm as jest.Mock).toHaveBeenCalledWith(expect.objectContaining({
      symptom: { Symptom_Name: 'Nausea' }
    }), undefined);
  });
  it("submits updated symptoms", async () => {
    const user = userEvent.setup();
    const mockSymptoms: Symptom[] = [{ Symptom_Name: 'Headache' }, { Symptom_Name: 'Nausea' }];
    (SymptomForm as jest.Mock).mockImplementation(({ submitHandler, symptom, index }) => (
        <Pressable onPress={() => {submitHandler({Symptom_Name: symptom.Symptom_Name + "horrible"}, index)}}>
          <Text>{symptom.Symptom_Name || 'Symptom Form'}</Text>
        </Pressable>
      ));
    const mockOnSubmit = jest.fn();
    const {getByText} = render(<SymptomsContainer onSubmit={mockOnSubmit} symptoms={mockSymptoms} />);

    // Simulate filling out the symptom form and submitting
    await user.press(getByText('Headache'));

    expect(mockOnSubmit).toHaveBeenCalledWith([
      { Symptom_Name: 'Headachehorrible' },
      { Symptom_Name: 'Nausea' }
    ]);

    expect(SymptomForm as jest.Mock).toHaveBeenCalledWith(expect.objectContaining({
      symptom: { Symptom_Name: 'Headachehorrible' }
    }), undefined);
    expect(SymptomForm as jest.Mock).toHaveBeenCalledWith(expect.objectContaining({
      symptom: { Symptom_Name: 'Nausea' }
    }), undefined);
  });
  it("trims blank Symptoms", async () => {
    const user = userEvent.setup();
    const mockSymptoms: Symptom[] = [{ Symptom_Name: 'Headache' }, { Symptom_Name: 'Nausea' }];
    (SymptomForm as jest.Mock).mockImplementation(({ submitHandler, symptom, index }) => (
        <Pressable onPress={() => {submitHandler({Symptom_Name: ""}, index)}}>
          <Text>{symptom.Symptom_Name || 'Symptom Form'}</Text>
        </Pressable>
      ));
    const mockOnSubmit = jest.fn();
    const {getByText} = render(<SymptomsContainer onSubmit={mockOnSubmit} symptoms={mockSymptoms} />);

    // Simulate filling out the symptom form and submitting
    await user.press(getByText('Nausea'));

    expect(mockOnSubmit).toHaveBeenCalledWith([
      { Symptom_Name: 'Headache' }
    ]);

    expect(SymptomForm as jest.Mock).toHaveBeenCalledWith(expect.objectContaining({
      symptom: { Symptom_Name: 'Headache' }
    }), undefined);
  });
  it("submits new symptom", async () => {
    const user = userEvent.setup();
    const mockOnSubmit = jest.fn();
    const { getByLabelText, getByText } = render(<SymptomsContainer onSubmit={mockOnSubmit} symptoms={[]} />);

    await user.type(getByLabelText(/New Symptom Name Input/i), "Dizziness");

    expect(mockOnSubmit).toHaveBeenCalledWith([
      { Symptom_Name: 'Dizziness', Symptom_Description: '' }
    ]);
  });
});
