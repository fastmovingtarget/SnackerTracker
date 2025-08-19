//2025-08-19 : Added Loading and Saving data to local storage
//2025-06-12 : Tests for Calendar and Forms now visible in different states
//2025-06-05 : Adding MealForm, SymptomForm and Calendar, collapsible buttons for the forms
//2025-06-03 : Creating file and initialising a basic render
import React from "react";
import { Text, Pressable } from "react-native";
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
  (MealForm as jest.Mock).mockImplementation(({ submitHandler }) => (
      <Pressable onPress={() => {console.log("Meal Form Pressed");submitHandler("Meals", [{ Meal_Name: "Breakfast" }])}}>
        <Text>Meal Form</Text>
      </Pressable>
    ));
  (SymptomForm as jest.Mock).mockImplementation(() => <Text>Symptom Form</Text>);
  (Calendar as jest.Mock).mockImplementation(({setSelectedDate, isVisible}) => 
    <Pressable onPress={() => setSelectedDate(new Date())} style={{display: isVisible ? 'flex' : 'none'}}>
      <Text>Calendar</Text>
    </Pressable>);
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
  it("Back to Calendar button appears", async () => {
    const user = userEvent.setup();
    const { getByText, queryByText } = render(<Home />);
    
    expect(getByText("Calendar")).toBeTruthy();
    expect(queryByText("Back to Calendar")).toBeFalsy(); // Back to Calendar button should be visible

    await user.press(getByText("Calendar")); // Simulate selecting a date
    
    expect(getByText("Back to Calendar")).toBeTruthy(); // Back to Calendar button should be visible
  });
  it("Back to Calendar button shows Calendar and hides Forms when pressed", async () => {
    const user = userEvent.setup();
    const { getByText, queryByText } = render(<Home />);

    expect(getByText("Calendar")).toBeTruthy();
    await user.press(getByText("Calendar")); // Simulate selecting a date

    expect(queryByText("Calendar")).toBeNull(); // Calendar should no longer be visible
    expect(getByText("Back to Calendar")).toBeTruthy(); // Back to Calendar button should be visible

    await user.press(getByText("Back to Calendar")); // Simulate pressing Back to Calendar

    expect(getByText("Calendar")).toBeTruthy(); // Calendar should now be visible again
    expect(queryByText("Back to Calendar")).toBeFalsy(); // Back to Calendar button should be visible
    expect(queryByText("Meals")).toBeFalsy(); // Back to Calendar button should be visible
    expect(queryByText("Symptoms")).toBeFalsy(); // Back to Calendar button should be visible
  })
})
describe("Home Component handles", () => {
  it("Meal Form toggle", async () => {
    const user = userEvent.setup();
    const { getByText, queryByText } = render(<Home />);

    await user.press(getByText("Calendar")); // Simulate selecting a date

    expect(getByText(/Meals/i)).toBeTruthy();
    expect(queryByText("Meal Form")).toBeNull(); // Initially not displayed

    await user.press(getByText(/Meals/i)); // Simulate press

    expect(getByText("Meal Form")).toBeTruthy(); // Now displayed
  });
  it("Symptom Form toggle", async () => {
    const user = userEvent.setup();
    const { getByText, queryByText } = render(<Home />);

    await user.press(getByText("Calendar")); // Simulate selecting a date

    expect(getByText(/Symptoms/i)).toBeTruthy();
    expect(queryByText("Symptom Form")).toBeNull(); // Initially not displayed

    await user.press(getByText(/Symptoms/i)); // Simulate press

    expect(getByText("Symptom Form")).toBeTruthy(); // Now displayed
  });
  it("Collapsables toggle each other", async () => {
    const user = userEvent.setup();
    const { getByText, queryByText } = render(<Home />);

    await user.press(getByText("Calendar")); // Simulate selecting a date

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