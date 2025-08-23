//2025-08-23 : Creating a container for the day's symptoms and meals
import { render, userEvent } from '@testing-library/react-native';
import { Text, Pressable } from 'react-native';
import MealsContainer from './MealsContainer/MealsContainer';
import DayPage from './DayPage';
import TrackerDay from '../../Types/TrackerDay';
import SymptomsContainer from './SymptomsContainer/SymptomsContainer';

jest.mock("./MealsContainer/MealsContainer", () => {
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
});
const testTrackerDay: TrackerDay = {
    Date: new Date("2025-08-19"),
    Meals: [{ Meal_Name: 'Breakfast' }],
    Symptoms: [],
    Notes: ''
}

describe("DayPage renders", () => {
    it("MealsContainer", () => {
        render(<DayPage selectedDate={testTrackerDay} backHandler={jest.fn()} index={0} handleSubmit={jest.fn()} />);
        expect(MealsContainer).toHaveBeenCalled();  
    });
    it("SymptomsContainer", () => {
        render(<DayPage selectedDate={testTrackerDay} backHandler={jest.fn()} index={0} handleSubmit={jest.fn()} />);
        expect(SymptomsContainer).toHaveBeenCalled();  
    });
    it("Selected Date", () => {
        const dateText = new Date("2025-08-19").toLocaleDateString();

        const { getByText } = render(<DayPage selectedDate={testTrackerDay} backHandler={jest.fn()} index={0} handleSubmit={jest.fn()} />);

        expect(getByText(dateText)).toBeTruthy();
    });
})
describe("DayPage interactions", () => {
    it("Returns to Calendar on back press", async () => {
        const user = userEvent.setup();
        const backHandler = jest.fn();
        const { getByText } = render(<DayPage selectedDate={testTrackerDay} backHandler={backHandler} index={0} handleSubmit={jest.fn()} />);

        await user.press(getByText("Back to Calendar"));

        expect(backHandler).toHaveBeenCalled();
    });
})