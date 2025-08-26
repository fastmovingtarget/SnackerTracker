//2025-08-26 : Changed tests to reflect new design for home page
//2025-08-23 : Home now uses the DayPage container
//2025-08-19 : Added Loading and Saving data to local storage
//2025-06-12 : Tests for Calendar and Forms now visible in different states
//2025-06-05 : Adding MealForm, SymptomForm and Calendar, collapsible buttons for the forms
//2025-06-03 : Creating file and initialising a basic render
import React from "react";
import { Text, Pressable } from "react-native";
import { render, userEvent, waitFor } from "@testing-library/react-native";
import Home from "./Home";
import Calendar from "./Calendar/Calendar";
import DayPage from "./DayPage/DayPage";
import {writeToStorage, readFromStorage} from '../Functions/StorageFunctions';

jest.mock('../Functions/StorageFunctions', () => {
  return {
    __esModule: true,
    writeToStorage: jest.fn(),
    readFromStorage: jest.fn()
  }
});

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

const testTrackerDay = {
  Date: new Date("2025-08-19"),
  Meals: [{ Meal_Name: 'Breakfast' }],
  Symptoms: [],
  Notes: ''
}

const mockSubmitHandler = jest.fn();

beforeEach(() => {
  jest.resetAllMocks();
  (Calendar as jest.Mock).mockImplementation(({ setSelectedDate, isVisible }) => (
    <Pressable onPress={() => { setSelectedDate(new Date("2025-08-19")); }} style={{ display: isVisible ? 'flex' : 'none' }}>
      <Text>Calendar</Text>
    </Pressable>
  ));
  (DayPage as jest.Mock).mockImplementation(({ selectedDate, backHandler, submitHandler }) => (
    <>
      <Pressable onPress={backHandler}>
        <Text>{selectedDate?.Date.toLocaleDateString()}</Text>
      </Pressable>
      <Pressable onPress={() => mockSubmitHandler(testTrackerDay)}>
        <Text>Tracker Day</Text>
      </Pressable>
    </>
  ));
  (readFromStorage as jest.Mock).mockResolvedValue([testTrackerDay]);
});

describe("Home Component renders", () => {
  it("Title Text",  async () => {
    const { getByText } = render(<Home />);
    await waitFor(() => {
      expect(getByText("Welcome to the Home Screen!")).toBeTruthy();
    });
  });
  it("Calendar element",  async () => {
    const { getByText } = render(<Home />);
    await waitFor(() => {
      expect(getByText("Calendar")).toBeTruthy();
    });
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
  it("DayPage appears with correct date", async () => {
    const user = userEvent.setup();

    const { getByText } = render(<Home />);

    await user.press(getByText("Calendar")); // Simulate selecting a date

    expect(getByText(new Date("2025-08-19").toLocaleDateString())).toBeTruthy(); // DayPage should display the selected date
  });
  it("When backHandler is called, should return to calendar view", async () => {
    const user = userEvent.setup();

    const { getByText, queryByText } = render(<Home />);

    await user.press(getByText("Calendar")); // Simulate selecting a date

    expect(queryByText(new Date("2025-08-19").toLocaleDateString())).toBeTruthy(); // DayPage should display the selected date

    await user.press(getByText(new Date("2025-08-19").toLocaleDateString())); // Simulate pressing back

    expect(queryByText("Calendar")).toBeTruthy(); // Calendar should be visible again
  });
})
describe("Home Component handles", () => {
  it("Submit Meal Form", async () => {
    const user = userEvent.setup();
    const testAgainstTrackerDay = {
      Date: new Date("2025-08-19"),
      Meals: [{ Meal_Name: "Breakfast" }],
      Symptoms: [],
      Notes: ""
    };

    const { getByText } = render(<Home />);

    await user.press(getByText("Calendar")); // Simulate selecting a date

    const trackerDateText = getByText(/Tracker Day/i);
    expect(trackerDateText).toBeTruthy();

    await user.press(getByText(/Tracker Day/i)); // Submit The tracker day

    expect(mockSubmitHandler).toHaveBeenCalledWith(testAgainstTrackerDay);
  });
})