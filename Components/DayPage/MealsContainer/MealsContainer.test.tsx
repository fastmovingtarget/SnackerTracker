//2025-09-04 : Changes to submit/render logic
//2025-09-02 : Added New Meal input from MealForm
//2025-08-23 : Container for the meal input forms
import { render, userEvent } from '@testing-library/react-native';
import { Text, Pressable } from 'react-native';
import MealsContainer from './MealsContainer';
import MealForm from './MealForm/MealForm';
import {useTrackerArray} from '../../../Contexts/TrackerContext';
import type Meal from '../../../Types/Meal';

jest.mock("./MealForm/MealForm", () => {
  return {
    __esModule: true,
    default: jest.fn()
  }
});

jest.mock("../../../Contexts/TrackerContext", () => {
  return {
    __esModule: true,
    useTrackerArray: jest.fn(),
  }
});

beforeEach(() => {
  jest.resetAllMocks();
  (MealForm as jest.Mock).mockImplementation(({ submitHandler, meal, index }) => (
      <Pressable onPress={() => {submitHandler(meal, index)}}>
        <Text>{meal.Meal_Name || 'Meal Form'}</Text>
      </Pressable>
    ));
  (useTrackerArray as jest.Mock).mockReturnValue({
    selectedDate: { Date: new Date("2025-08-19"), Meals: [{Meal_Name:'Breakfast'}, {Meal_Name:'Lunch'}], Symptoms: [], Notes: '' },
    handleSubmit: jest.fn()
  });
});

describe('MealsContainer Component Renders', () => {
  it("existing meal form components", () => {
  (useTrackerArray as jest.Mock).mockReturnValue({
    selectedDate: { Date: new Date("2025-08-19"), Meals: [{Meal_Name:'Breakfast'}, {Meal_Name:'Lunch'}, {Meal_Name:'Dinner'}], Symptoms: [], Notes: '' },
    handleSubmit: jest.fn()
  });

    render(<MealsContainer/>);

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
});
describe('MealsContainer Component Functionality', () => {
  it("submits meals", async () => {
    const user = userEvent.setup();

    const {getByText} = render(<MealsContainer/>);

    // Simulate filling out the meal form and submitting
    await user.press(getByText('Breakfast'));

    expect(useTrackerArray().handleSubmit).toHaveBeenCalledWith(expect.objectContaining({
      Meals:[
        { Meal_Name: 'Breakfast' },
        { Meal_Name: 'Lunch' }]
      }));
  });
  it("submits updated meals", async () => {
    const user = userEvent.setup();
    (MealForm as jest.Mock).mockImplementation(({ submitHandler, meal, index }) => (
        <Pressable onPress={() => {submitHandler({Meal_Name: meal.Meal_Name + "delicious"}, index)}}>
          <Text>{meal.Meal_Name || 'Meal Form'}</Text>
        </Pressable>
      ));

    const {getByText} = render(<MealsContainer />);

    // Simulate filling out the meal form and submitting
    await user.press(getByText('Breakfast'));

    expect(useTrackerArray().handleSubmit).toHaveBeenCalledWith(expect.objectContaining({Meals:[
      { Meal_Name: 'Breakfastdelicious' },
      { Meal_Name: 'Lunch' }
    ]}));
  });
  it("trims blank meals", async () => {
    const user = userEvent.setup();
    (MealForm as jest.Mock).mockImplementation(({ submitHandler, meal, index }) => (
        <Pressable onPress={() => {submitHandler({Meal_Name: ""}, index)}}>
          <Text>{meal.Meal_Name || 'Meal Form'}</Text>
        </Pressable>
      ));

    const {getByText} = render(<MealsContainer />);

    // Simulate filling out the meal form and submitting
    await user.press(getByText('Lunch'));

    expect(useTrackerArray().handleSubmit).toHaveBeenCalledWith(expect.objectContaining({
      Meals:[
       { Meal_Name: 'Breakfast' }
    ]}));

    expect(MealForm as jest.Mock).toHaveBeenCalledWith(expect.objectContaining({
      meal: { Meal_Name: 'Breakfast' }
    }), undefined);
  });
});
describe("Meal container add new meal input", () =>{
  it("renders new meal input", () => {
    const { getByLabelText } = render(<MealsContainer />);
    expect(getByLabelText(/New Meal Name Input/i)).toBeTruthy();
  });
  it("submits new meal input", async () => {
    const user = userEvent.setup();
    
    const { getByLabelText } = render(<MealsContainer />);

    await user.type(getByLabelText(/New Meal Name Input/i), 'Dinner');

    expect(useTrackerArray().handleSubmit).toHaveBeenCalledWith(expect.objectContaining({
      Meals:[
        { Meal_Name: 'Breakfast' },
        { Meal_Name: 'Lunch' },
        { Meal_Name: 'Dinner', Meal_Ingredients: [] }
      ]
    }));
  });
});
