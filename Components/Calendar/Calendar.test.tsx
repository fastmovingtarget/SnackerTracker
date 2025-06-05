//2025-06-05 : Implementing and testing a full calendar visual
//2025-06-04 : Initial Commit with placeholder implementation

import { render, screen, userEvent }from '@testing-library/react-native';
import Calendar from './Calendar';

const mockDataContext = {
};


beforeEach(() => {
  jest.resetAllMocks();
});

const monthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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
        
        expect(getByText(/</i)).toBeTruthy();
        expect(getByText(/>/i)).toBeTruthy();
    });
    test("The calendar day headers", () => {
        const {getByText} = render(
            <Calendar />
        );

        expect(getByText(/M/i)).toBeTruthy();
        expect(getByText(/Tu/i)).toBeTruthy();
        expect(getByText(/W/i)).toBeTruthy();
        expect(getByText(/Th/i)).toBeTruthy();
        expect(getByText(/F/i)).toBeTruthy();
        expect(getByText(/Sa/i)).toBeTruthy();
        expect(getByText(/Su/i)).toBeTruthy();
        
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
    test("The recipe names each day", () => {
        
    })
});
describe("Recipe Plan Calendar functionality", () => {
    test("The month changes when the left button is pressed", async () => {
        const user = userEvent.setup();
        const {getByText, getAllByText} = render(
            <Calendar />
        );

        const currentMonth = new Date().getMonth();
        const previousMonth = new Date().setMonth(currentMonth - 1);

        await user.press(getByText(/</i));

        expect(getByText(new Date(previousMonth).toLocaleString('default', { month: 'short' }))).toBeTruthy();
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

        await user.press(getByText(/>/i));

        expect(getByText(new Date(nextMonth).toLocaleString('default', { month: 'short' }))).toBeTruthy();
        const daysInMonth = new Date(new Date().getFullYear(), currentMonth + 2, 0).getDate();

        for(let i = 1; i <= daysInMonth; i++) {
            expect(getAllByText(`${i}`).length).toBeGreaterThan(0);// Check that each day of the previous month is rendered
        }
    });
})