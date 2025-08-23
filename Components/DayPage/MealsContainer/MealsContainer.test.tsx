//2025-08-23 : Container for the meal input forms


import { render, userEvent } from '@testing-library/react-native';
import { Text, Pressable } from 'react-native';
import MealsContainer from './MealsContainer';
import MealForm from './MealForm/MealForm';
import type Meal from '../../../Types/Meal';

jest.mock("./MealForm/MealForm", () => {
  return {
    __esModule: true,
    default: jest.fn()
  }
});

beforeEach(() => {
  jest.resetAllMocks();
  (MealForm as jest.Mock).mockImplementation(({ submitHandler, meal, index }) => (
      <Pressable onPress={() => {submitHandler(meal, index)}}>
        <Text>{meal.Meal_Name || 'Meal Form'}</Text>
      </Pressable>
    ));
});

describe('MealsContainer Component Renders', () => {
  it("existing meal form components", () => {
    const mockMeals : Meal[] = [{Meal_Name:'Breakfast'}, {Meal_Name:'Lunch'}, {Meal_Name:'Dinner'}];
    render(<MealsContainer onSubmit={jest.fn()} meals={mockMeals} />);

    expect(MealForm).toHaveBeenCalledWith(expect.objectContaining({
      meal: { Meal_Name: 'Breakfast' }
    }), undefined);
    expect(MealForm).toHaveBeenCalledWith(expect.objectContaining({
      meal: { Meal_Name: 'Lunch' }
    }), undefined);
    expect(MealForm).toHaveBeenCalledWith(expect.objectContaining({
      meal: { Meal_Name: 'Dinner' }
    }), undefined);
  })
  it("blank meal form when other meals are provided", () => {
    render(<MealsContainer onSubmit={jest.fn()} meals={[{Meal_Name:'Breakfast'}, {Meal_Name:'Lunch'}, {Meal_Name:'Dinner'}]} />);

    expect(MealForm).toHaveBeenCalledWith(expect.objectContaining({
      meal: { Meal_Name: '' }
    }), undefined);

  });
  it("Only blank meal form when no meals are provided", () => {
    render(<MealsContainer onSubmit={jest.fn()} meals={[]} />);

    expect(MealForm).toHaveBeenCalledWith(expect.objectContaining({
      meal: { Meal_Name: '' }
    }), undefined);
  });
});
describe('MealsContainer Component Functionality', () => {
  it("submits meals", async () => {
    const user = userEvent.setup();
    const mockMeals: Meal[] = [{ Meal_Name: 'Breakfast' }, { Meal_Name: 'Lunch' }];
    const mockOnSubmit = jest.fn();
    const {getByText} = render(<MealsContainer onSubmit={mockOnSubmit} meals={mockMeals} />);

    // Simulate filling out the meal form and submitting
    await user.press(getByText('Breakfast'));

    expect(mockOnSubmit).toHaveBeenCalledWith([
      { Meal_Name: 'Breakfast' },
      { Meal_Name: 'Lunch' }
    ]);
    
    expect(MealForm as jest.Mock).toHaveBeenCalledWith(expect.objectContaining({
      meal: { Meal_Name: 'Breakfast' }
    }), undefined);
    expect(MealForm as jest.Mock).toHaveBeenCalledWith(expect.objectContaining({
      meal: { Meal_Name: 'Lunch' }
    }), undefined);
    expect(MealForm as jest.Mock).toHaveBeenCalledWith(expect.objectContaining({
      meal: { Meal_Name: '' }
    }), undefined);
  });
  it("submits updated meals", async () => {
    const user = userEvent.setup();
    const mockMeals: Meal[] = [{ Meal_Name: 'Breakfast' }, { Meal_Name: 'Lunch' }];
    (MealForm as jest.Mock).mockImplementation(({ submitHandler, meal, index }) => (
        <Pressable onPress={() => {submitHandler({Meal_Name: meal.Meal_Name + "delicious"}, index)}}>
          <Text>{meal.Meal_Name || 'Meal Form'}</Text>
        </Pressable>
      ));
    const mockOnSubmit = jest.fn();
    const {getByText} = render(<MealsContainer onSubmit={mockOnSubmit} meals={mockMeals} />);

    // Simulate filling out the meal form and submitting
    await user.press(getByText('Breakfast'));

    expect(mockOnSubmit).toHaveBeenCalledWith([
      { Meal_Name: 'Breakfastdelicious' },
      { Meal_Name: 'Lunch' }
    ]);

    expect(MealForm as jest.Mock).toHaveBeenCalledWith(expect.objectContaining({
      meal: { Meal_Name: 'Breakfastdelicious' }
    }), undefined);
    expect(MealForm as jest.Mock).toHaveBeenCalledWith(expect.objectContaining({
      meal: { Meal_Name: 'Lunch' }
    }), undefined);
    expect(MealForm as jest.Mock).toHaveBeenCalledWith(expect.objectContaining({
      meal: { Meal_Name: '' }
    }), undefined);
  });
  it("trims blank meals", async () => {
    const user = userEvent.setup();
    const mockMeals: Meal[] = [{ Meal_Name: 'Breakfast' }, { Meal_Name: 'Lunch' }];
    (MealForm as jest.Mock).mockImplementation(({ submitHandler, meal, index }) => (
        <Pressable onPress={() => {submitHandler({Meal_Name: ""}, index)}}>
          <Text>{meal.Meal_Name || 'Meal Form'}</Text>
        </Pressable>
      ));
    const mockOnSubmit = jest.fn();
    const {getByText} = render(<MealsContainer onSubmit={mockOnSubmit} meals={mockMeals} />);

    // Simulate filling out the meal form and submitting
    await user.press(getByText('Lunch'));

    expect(mockOnSubmit).toHaveBeenCalledWith([
      { Meal_Name: 'Breakfast' }
    ]);

    expect(MealForm as jest.Mock).toHaveBeenCalledWith(expect.objectContaining({
      meal: { Meal_Name: 'Breakfast' }
    }), undefined);
    expect(MealForm as jest.Mock).toHaveBeenCalledWith(expect.objectContaining({
      meal: { Meal_Name: '' }
    }), undefined);
  });
});
