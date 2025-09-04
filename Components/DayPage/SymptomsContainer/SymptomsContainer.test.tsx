//2025-09-04 : Changes to submit logic due to new context
//2025-09-02 : Moved new symptom name form from SymptomForm
//2025-08-26 : Fixed mock symptom form
//2025-08-23 : Container for the symptom input forms


import { render, userEvent } from '@testing-library/react-native';
import { Text, Pressable } from 'react-native';
import SymptomsContainer from './SymptomsContainer';
import SymptomForm from './SymptomForm/SymptomForm';
import Symptom from '../../../Types/Symptom';
import {useTrackerArray} from '../../../Contexts/TrackerContext';
import { use } from 'react';

jest.mock("../../../Contexts/TrackerContext", () => {
  return {
    __esModule: true,
    useTrackerArray: jest.fn(),
  }
});

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
  (useTrackerArray as jest.Mock).mockReturnValue({
    selectedDate: { Date: new Date("2025-08-19"), Meals: [], Symptoms: [{Symptom_Name:'Headache'}, {Symptom_Name:'Nausea'}], Notes: '' },
    handleSubmit: jest.fn()
  });
});

describe('SymptomsContainer Component Renders', () => {
  it("existing symptom form components", () => {
    render(<SymptomsContainer />);

    expect(SymptomForm).toHaveBeenCalledWith(expect.objectContaining({
      symptom: { Symptom_Name: 'Headache' }
    }), undefined);
    expect(SymptomForm).toHaveBeenCalledWith(expect.objectContaining({
      symptom: { Symptom_Name: 'Nausea' }
    }), undefined);
  })
  it("new symptom input", () => {
    const { getByLabelText } = render(<SymptomsContainer />);

    expect(getByLabelText(/New Symptom Name Input/i)).toBeTruthy();
  });
});
describe('SymptomsContainer Component Functionality', () => {
  it("submits Symptoms", async () => {
    const user = userEvent.setup();
    const {getByText} = render(<SymptomsContainer />);

    // Simulate filling out the symptom form and submitting
    await user.press(getByText('Headache'));

    expect(useTrackerArray().handleSubmit).toHaveBeenCalledWith(expect.objectContaining({
      Symptoms:[
        { Symptom_Name: 'Headache' },
        { Symptom_Name: 'Nausea' }
      ]
    }));
  });
  it("submits updated symptoms", async () => {
    const user = userEvent.setup();
    const mockSymptoms: Symptom[] = [{ Symptom_Name: 'Headache' }, { Symptom_Name: 'Nausea' }];
    (SymptomForm as jest.Mock).mockImplementation(({ submitHandler, symptom, index }) => (
        <Pressable onPress={() => {submitHandler({Symptom_Name: symptom.Symptom_Name + "horrible"}, index)}}>
          <Text>{symptom.Symptom_Name || 'Symptom Form'}</Text>
        </Pressable>
      ));
    const {getByText} = render(<SymptomsContainer />);

    // Simulate filling out the symptom form and submitting
    await user.press(getByText('Headache'));

    expect(useTrackerArray().handleSubmit).toHaveBeenCalledWith(expect.objectContaining({
      Symptoms:[
        { Symptom_Name: 'Headachehorrible' },
        { Symptom_Name: 'Nausea' }
      ]
    }));
  });
  it("trims blank Symptoms", async () => {
    const user = userEvent.setup();
    const mockSymptoms: Symptom[] = [{ Symptom_Name: 'Headache' }, { Symptom_Name: 'Nausea' }];
    (SymptomForm as jest.Mock).mockImplementation(({ submitHandler, symptom, index }) => (
        <Pressable onPress={() => {submitHandler({Symptom_Name: ""}, index)}}>
          <Text>{symptom.Symptom_Name || 'Symptom Form'}</Text>
        </Pressable>
      ));
    const {getByText} = render(<SymptomsContainer />);

    // Simulate filling out the symptom form and submitting
    await user.press(getByText('Nausea'));

    expect(useTrackerArray().handleSubmit).toHaveBeenCalledWith(expect.objectContaining({
      Symptoms:[
        { Symptom_Name: 'Headache' }
      ]
    }));

    expect(SymptomForm as jest.Mock).toHaveBeenCalledWith(expect.objectContaining({
      symptom: { Symptom_Name: 'Headache' }
    }), undefined);
  });
  it("submits new symptom", async () => {
    const user = userEvent.setup();
    const { getByLabelText, getByText } = render(<SymptomsContainer />);

    await user.type(getByLabelText(/New Symptom Name Input/i), "Dizziness");

    expect(useTrackerArray().handleSubmit).toHaveBeenCalledWith(expect.objectContaining({
      Symptoms:[
        ...useTrackerArray().selectedDate.Symptoms,
        { Symptom_Name: 'Dizziness', Symptom_Description: '' }
      ]
    }));
  });
});
