//2025-06-05 : Adding MealForm, SymptomForm and Calendar, collapsible buttons for the forms
//2025-06-03 : Creating file and initialising a basic render
import React from "react";
import { Text } from "react-native";
import { render, userEvent } from "@testing-library/react-native";
import Home from "./Home";
import MealForm from "./MealForm/MealForm";
import SymptomForm from "./SymptomForm/SymptomForm";
import Calendar from "./Calendar/Calendar";

jest.mock("./MealForm/MealForm", () => {
  return {
    __esModule: true,
    default: jest.fn()
  }
});
jest.mock("./SymptomForm/SymptomForm", () => {
  return {
    __esModule: true,
    default: jest.fn()
  }
});
jest.mock("./Calendar/Calendar", () => {
  return {
    __esModule: true,
    default: jest.fn()
  }
});

beforeEach(() => {
  jest.resetAllMocks();
  (MealForm as jest.Mock).mockImplementation(() => <Text>Meal Form</Text>);
  (SymptomForm as jest.Mock).mockImplementation(() => <Text>Symptom Form</Text>);
  (Calendar as jest.Mock).mockImplementation(() => <Text>Calendar</Text>);
});

describe("Home Component renders", () => {
  it("Title Text", () => {
    const { getByText } = render(<Home />);
    expect(getByText("Welcome to the Home Screen!")).toBeTruthy();
  });
  it("Meal Form collapsible", () => {
    const { getByText } = render(<Home />);
    expect(getByText(/Meals/i)).toBeTruthy();
  })
  it("Symptom Form collapsible", () => {
    const { getByText } = render(<Home />);
    expect(getByText(/Symptoms/i)).toBeTruthy();
  });
  it("Calendar element", () => {
    const { getByText } = render(<Home />);
    expect(getByText("Calendar")).toBeTruthy();
  });
});
describe("Home Component handles", () => {
  it("Meal Form toggle", async () => {
    const user = userEvent.setup();
    const { getByText, queryByText } = render(<Home />);

    expect(getByText(/Meals/i)).toBeTruthy();
    expect(queryByText("Meal Form")).toBeNull(); // Initially not displayed

    await user.press(getByText(/Meals/i)); // Simulate press

    expect(getByText("Meal Form")).toBeTruthy(); // Now displayed
  });
  it("Symptom Form toggle", async () => {
    const user = userEvent.setup();
    const { getByText, queryByText } = render(<Home />);

    expect(getByText(/Symptoms/i)).toBeTruthy();
    expect(queryByText("Symptom Form")).toBeNull(); // Initially not displayed

    await user.press(getByText(/Symptoms/i)); // Simulate press

    expect(getByText("Symptom Form")).toBeTruthy(); // Now displayed
  });
  it("Collapsables toggle each other", async () => {
    const user = userEvent.setup();
    const { getByText, queryByText } = render(<Home />);

    expect(getByText(/Meals/i)).toBeTruthy();
    expect(getByText(/Symptoms/i)).toBeTruthy();
    expect(queryByText("Meal Form")).toBeNull(); // Initially not displayed
    expect(queryByText("Symptom Form")).toBeNull(); // Initially not displayed

    await user.press(getByText(/Meals/i)); // Simulate press on Meals
    expect(getByText("Meal Form")).toBeTruthy(); // Now displayed
    expect(queryByText("Symptom Form")).toBeNull(); // Symptom Form still not displayed

    await user.press(getByText(/Symptoms/i)); // Simulate press on Symptoms
    expect(getByText("Symptom Form")).toBeTruthy(); // Now displayed
    expect(queryByText("Meal Form")).toBeNull(); // Meal Form should be hidden
  })
})