//2025-09-04 : Moving submit logic, styling changes
//2025-08-26 : DayPage changed submitHandler to handleSubmit
//2025-08-23 : Creating a container for the day's symptoms and meals
import { render, userEvent } from '@testing-library/react-native';
import { Text, Pressable } from 'react-native';
import MealsContainer from './MealsContainer/MealsContainer';
import DayPage from './DayPage';
import TrackerDay from '../../Types/TrackerDay';
import SymptomsContainer from './SymptomsContainer/SymptomsContainer';
import {useTrackerArray} from '../../Contexts/TrackerContext';

jest.mock("../../Contexts/TrackerContext", () => {
  return {
    __esModule: true,
    useTrackerArray: jest.fn(),
  }
});

jest.mock("./MealsContainer/MealsContainer", () => {
  return {
    __esModule: true,
    default: jest.fn()
  }
});
jest.mock("./SymptomsContainer/SymptomsContainer", () => {
  return {
    __esModule: true,
    default: jest.fn()
  }
});

beforeEach(() => {
  jest.resetAllMocks();
  (MealsContainer as jest.Mock).mockImplementation(({ submitHandler }) => (
      <Pressable onPress={() => {submitHandler("Meals", [{ Meal_Name: "Breakfast" }])}}>
        <Text>Meal Form</Text>
      </Pressable>
    ));
  (SymptomsContainer as jest.Mock).mockImplementation(({ submitHandler }) => (
      <Pressable onPress={() => {submitHandler("Symptoms", [{ Symptom_Name: "Headache" }])}}>
        <Text>Symptom Form</Text>
      </Pressable>
    ));
  (useTrackerArray as jest.Mock).mockReturnValue({
    selectedDate: { Date: new Date("2025-08-19"), Meals: [], Symptoms: [], Notes: '' },
    handleSubmit: jest.fn()
  });
});
const testTrackerDay: TrackerDay = {
    Date: new Date("2025-08-19"),
    Meals: [{ Meal_Name: 'Breakfast' }],
    Symptoms: [],
    Notes: ''
}

describe("DayPage renders", () => {
    it("MealsContainer", () => {
        render(<DayPage />);
        expect(MealsContainer).toHaveBeenCalled();  
    });
    it("SymptomsContainer", () => {
        render(<DayPage />);
        expect(SymptomsContainer).toHaveBeenCalled();  
    });
    it("Selected Date", () => {
        const dateText = new Date("2025-08-19").toLocaleDateString();

        const { getByText } = render(<DayPage />);

        expect(getByText(dateText)).toBeTruthy();
    });
})