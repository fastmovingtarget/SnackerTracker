//2025-09-04 : Moving Tracker load and submit logic to Tracker Context, unifying day page and calendar
//2025-09-02 : Added today's meal/symptom input to home page
//2025-08-28 : Added a clearStorage function for testing, removed error flag when empty
//2025-08-26 : Day Page call now uses submitHandler rather than handleSubmit
//2025-08-23 : Home now uses the DayPage container
//2025-08-19 : Added Loading and Saving data to local storage
//2025-06-13 : Adding dummy function for meal form submit handling
//2025-06-13 : Tidying up the styles
//2025-06-12 : Moving Calendar and Form views to different states, Improving Collapsible buttons
//2025-06-05 : Adding MealForm, SymptomForm and Calendar, collapsible buttons for the forms
//2025-06-03 : Creating file and initialising a basic render
import Calendar from './Calendar/Calendar';
import { ColumnContainer } from '../CustomComponents/CustomComponents';
import DayPage from './DayPage/DayPage';

export default function Home() {
  return (
    <ColumnContainer style={{borderRadius: 0, padding: 0, margin:0, justifyContent:"flex-start", flexDirection:"column", width:"100%", height:"100%", paddingTop: 15}}>
        <DayPage />
        <Calendar />
    </ColumnContainer>
  );
}

