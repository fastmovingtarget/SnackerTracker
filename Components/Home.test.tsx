//2025-09-04 : Moving Tracker load and submit logic to Tracker Context, unifying day page and calendar
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
  (Calendar as jest.Mock).mockImplementation(() => (
    <Pressable>
      <Text>Calendar</Text>
    </Pressable>
  ));
  (DayPage as jest.Mock).mockImplementation(() => (
    <>
      <Pressable>
        <Text>Tracker Day</Text>
      </Pressable>
    </>
  ));
});

describe("Home Component renders", () => {
  it("Calendar element",  async () => {
    const { getByText } = render(<Home />);

    expect(getByText("Calendar")).toBeTruthy();
  });
  it("DayPage", async () => {
    const user = userEvent.setup();

    const { getByText } = render(<Home />);


    expect(getByText("Tracker Day")).toBeTruthy(); // DayPage should display the selected date
  });
});