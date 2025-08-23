//2025-08-23 : Home now uses the DayPage container
//2025-08-19 : Added Loading and Saving data to local storage
//2025-06-12 : Tests for Calendar and Forms now visible in different states
//2025-06-05 : Adding MealForm, SymptomForm and Calendar, collapsible buttons for the forms
//2025-06-03 : Creating file and initialising a basic render
import React from "react";
import { Text, Pressable } from "react-native";
import { render, userEvent } from "@testing-library/react-native";
import Home from "./Home";
import Calendar from "./Calendar/Calendar";
import DayPage from "./DayPage/DayPage";

jest.mock("./Calendar/Calendar", () => {
  return {
    __esModule: true,
    default: jest.fn()
  }
});

jest.mock("./DayPage/DayPage", () => {
  return {
    __esModule: true,
    default: jest.fn()
  }
});

beforeEach(() => {
  jest.resetAllMocks();
  (Calendar as jest.Mock).mockImplementation(({ setSelectedDate }) => (
    <Pressable onPress={() => { setSelectedDate(new Date("2025-08-19")); }}>
      <Text>Calendar</Text>
    </Pressable>
  ));
  (DayPage as jest.Mock).mockImplementation(({ selectedDate, backHandler }) => (
    <Pressable onPress={backHandler}>
      <Text>{selectedDate?.Date.toLocaleDateString()}</Text>
    </Pressable>
  ));
});

describe("Home Component renders", () => {
  it("Title Text", () => {
    const { getByText } = render(<Home />);
    expect(getByText("Welcome to the Home Screen!")).toBeTruthy();
  });
  it("Calendar element", () => {
    const { getByText } = render(<Home />);
    expect(getByText("Calendar")).toBeTruthy();
  });
});
describe("When a date is selected", () => {
  it("Calendar hides", async () => {
    const user = userEvent.setup();

    const { getByText, queryByText } = render(<Home />);

    expect(getByText("Calendar")).toBeTruthy();
    await user.press(getByText("Calendar")); // Simulate selecting a date

    expect(queryByText("Calendar")).toBeNull(); // Calendar should no longer be visible
  });
})
describe("Home Component handles", () => {
  it("Submit Meal Form", async () => {
    const user = userEvent.setup();
    const mockSubmitHandler = jest.fn(() => console.log("Meal Form Submitted"));

    const { getByText } = render(<Home />);

    await user.press(getByText("Calendar")); // Simulate selecting a date
    await user.press(getByText(/Meals/i)); // Open Meal Form
    expect(getByText("Meal Form")).toBeTruthy(); // Now displayed
    await user.press(getByText("Meal Form")); // Submit Meal Form

    expect(mockSubmitHandler).toHaveBeenCalledWith("Meals", [{ Meal_Name: "Breakfast" }]);
  });
})