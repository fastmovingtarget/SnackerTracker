//2025-09-04 : Styling and visual changes, hide button, hide on keyboard
//2025-09-02 : Shrunk the arrows a little bit
//2025-08-27 : Minor visual formatting changes
//2025-06-13 : Tests for date selection and visibility changes
//2025-06-05 : Implementing and testing a full calendar visual
//2025-06-04 : Initial Commit with placeholder implementation

import { render, screen, userEvent }from '@testing-library/react-native';
import Calendar from './Calendar';
import { useTrackerArray } from '../../Contexts/TrackerContext';

jest.mock('../../Contexts/TrackerContext', () => {
  return {
    __esModule: true,
    useTrackerArray: jest.fn()
  }
});


beforeEach(() => {
  jest.resetAllMocks();
    (useTrackerArray as jest.Mock).mockReturnValue({
      setSelectedDate: jest.fn(),
        selectedDate: { Date: new Date(), Meals: [], Symptoms: [], Notes: '' },
    });
});

const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

describe("Recipe Plan Calendar Renders", () => {
    test("The month correctly", () => {
        const currentMonth = monthsOfYear[new Date().getMonth()];// can't hardcode this as it will change over time, but can at least check that it is the current month via a different method

        const {getByText} = render(
            <Calendar />
        );

        expect(getByText(`${currentMonth}`)).toBeTruthy();
    });
    test("Month navigation buttons", () => {
        const {getByText} = render(
            <Calendar />
        );
        
        expect(getByText(/\u2039/i)).toBeTruthy();
        expect(getByText(/\u203A/i)).toBeTruthy();
    });
    test("The calendar day headers", () => {
        const {getByText} = render(
            <Calendar />
        );

        expect(getByText("M")).toBeTruthy();
        expect(getByText("Tu")).toBeTruthy();
        expect(getByText("W")).toBeTruthy();
        expect(getByText("Th")).toBeTruthy();
        expect(getByText("F")).toBeTruthy();
        expect(getByText("Sa")).toBeTruthy();
        expect(getByText("Su")).toBeTruthy();

    });
    test("The actual calendar itself", () => {
        const today = new Date();
        const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

        const {getAllByText} = render(
            <Calendar />
        );

        for(let i = 1; i <= daysInMonth; i++) {
            expect(getAllByText(`${i}`).length).toBeGreaterThan(0);// Check that each day of the month is rendered at least once
        }        
    });
    test("Calendar visibility toggle button", () => {
        const {getByText} = render(
            <Calendar />
        );
        expect(getByText(/Hide Calendar/i)).toBeTruthy();
    });
    test("Nothing when Hide Calendar has been clicked is false", async () => {
        const user = userEvent.setup();

        const {queryByText, getByText} = render(
            <Calendar />
        );

        await user.press(getByText(/Hide Calendar/i));

        expect(queryByText(/Show Calendar/i)).toBeTruthy();

        expect(queryByText("M")).toBeNull();
        expect(queryByText("Tu")).toBeNull();
        expect(queryByText("W")).toBeNull();
        expect(queryByText("Th")).toBeNull();
        expect(queryByText("F")).toBeNull();
        expect(queryByText("Sa")).toBeNull();
        expect(queryByText("Su")).toBeNull();

        expect(queryByText(/\u2039/i)).toBeNull();
        expect(queryByText(/\u203A/i)).toBeNull();
        
        for(let i = 1; i <= 31; i++) {
            expect(queryByText(`${i}`)).toBeNull();// Check that each day of the month is not rendered
        }
    });
});
describe("Recipe Plan Calendar functionality", () => {
    test("The month changes when the left button is pressed", async () => {
        const user = userEvent.setup();
        const {getByText, getAllByText} = render(
            <Calendar />
        );

        const currentMonth = new Date().getMonth();
        const previousMonth = new Date().setMonth(currentMonth - 1);

        await user.press(getByText(/\u2039/i));

        expect(getByText(new Date(previousMonth).toLocaleString('default', { month: 'long' }))).toBeTruthy();
        const daysInMonth = new Date(new Date().getFullYear(), currentMonth, 0).getDate();

        for(let i = 1; i <= daysInMonth; i++) {
            expect(getAllByText(`${i}`).length).toBeGreaterThan(0);// Check that each day of the previous month is rendered
        }
    });

    test("The month changes when the right button is pressed", async () => {
        const user = userEvent.setup();
        const {getByText, getAllByText} = render(
            <Calendar />
        );

        const currentMonth = new Date().getMonth();
        const nextMonth = new Date().setMonth(currentMonth + 1);

        await user.press(getByText(/\u203A/i));

        expect(getByText(new Date(nextMonth).toLocaleString('default', { month: 'long' }))).toBeTruthy();
        const daysInMonth = new Date(new Date().getFullYear(), currentMonth + 2, 0).getDate();

        for(let i = 1; i <= daysInMonth; i++) {
            expect(getAllByText(`${i}`).length).toBeGreaterThan(0);// Check that each day of the previous month is rendered
        }
    });

    test("Selecting a date calls setSelectedDate with the correct date", async () => {
        const {getByText} = render(
            <Calendar />
        );

        const dateToSelect = new Date(new Date().getFullYear(), new Date().getMonth(), 15); // Select the 15th of the current month

        await userEvent.press(getByText(`15`));

        expect(useTrackerArray().setSelectedDate).toHaveBeenCalledWith(dateToSelect);
    });
})