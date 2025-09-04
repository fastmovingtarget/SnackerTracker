//2025-09-04 : Styling and visual changes, hide button, hide on keyboard
//2025-09-02 : Shrunk the arrows a little bit
//2025-08-27 : Adding Colour theme export/import
//2025-06-13 : Splitting calendar into specific rows rather than overflowing a single row
//2025-06-05 : Implementing and testing a full calendar visual
//2025-06-04 : Initial Commit with placeholder implementation
import React, { useState } from 'react';
import StyledText from '../../CustomComponents/StyledText';
import ColumnContainer from '../../CustomComponents/ColumnContainer';
import RowContainer from '../../CustomComponents/RowContainer';
import PressableContainer from '../../CustomComponents/PressableContainer';
import { useTrackerArray } from '../../Contexts/TrackerContext';
import Fonts from '../../Constants/Fonts';
import { Colours } from '../../Constants/Colours';

export default function Calendar() {
    const { setSelectedDate, selectedDate, isKeyboard } = useTrackerArray();
    const [calendarVisible, setCalendarVisible] = useState(true);

    const [monthIndex, setMonthIndex] = useState(0); // 0 for current month, -1 for last month, 1 for next month

    const daysOfWeek = ["M", "Tu", "W", "Th", "F", "Sa", "Su"];

    const today = new Date();

    const monthStartDate = new Date(today.getFullYear(), today.getMonth() + monthIndex, 1);

    const monthArray : Date[][] = [[], [], [], [], [], []]; // 6 weeks, each will have 7 days added
   
    for (let i = 0; i < 42; i++){
        monthArray[Math.trunc(i/7)].push(new Date(monthStartDate.getFullYear(), monthStartDate.getMonth(), (2 + i) - (monthStartDate.getDay() || 7)));
    }
    if(isKeyboard) {
        return <></>;
    }
    return (
        <>
            <RowContainer style={{padding:0, margin:0}}>
                <PressableContainer style={{flex:1, padding:0, margin:0}} onPress={() => setCalendarVisible(!calendarVisible)}>
                    <StyledText style={{ fontSize:20, padding:0, margin:0, textAlign: 'center' }}>
                        {calendarVisible ? "Hide Calendar" : "Show Calendar"}
                    </StyledText>
                </PressableContainer>
            </RowContainer>
            <ColumnContainer style={{display: calendarVisible ? 'flex' : 'none', padding:5, margin:0, alignItems: 'center', flex:2}}>
                <RowContainer style={{padding:0, margin:0}}>
                    <PressableContainer onPress={() => setMonthIndex(monthIndex - 1)} style={{ paddingHorizontal: 20, paddingVertical: 20, borderRadius:25, height: "0%", width:"0%"}}>
                        <StyledText style={{ fontSize:30, position: 'absolute', top: -13, left: 4 }}>
                            {'\u2039'}
                        </StyledText>
                    </PressableContainer>
                        <StyledText style={{ flex: 1, fontSize: Fonts.sizes.title, margin:0, padding:0, textAlign: 'center', borderRadius:0 }}>
                            {monthStartDate.toLocaleString('default', { month: 'long' })}
                        </StyledText>
                    <PressableContainer onPress={() => setMonthIndex(monthIndex + 1)} style={{ paddingHorizontal: 20, paddingVertical: 20, borderRadius:25, height: "0%", width:"0%"}}>
                        <StyledText style={{ fontSize:30, position: 'absolute', top: -13, left: 6 }}>
                            {'\u203A'}
                        </StyledText>
                    </PressableContainer>
                </RowContainer>
                <RowContainer style={{padding:0, margin:0}}>
                    {daysOfWeek.map((day, index) => (
                        <RowContainer key={`day-header-${index}`} style={{ flex: 1, justifyContent: 'center', padding:0, margin:0 }}>
                            <StyledText style={{ flex: 1, textAlign: 'center', fontSize: Fonts.sizes.medium }}>
                                {day}
                            </StyledText>
                        </RowContainer>
                    ))}
                </RowContainer>
                <ColumnContainer style={{ justifyContent: 'space-between' , padding:0, flex:1}}>
                    {monthArray.map((week, weekIndex) => (
                        <RowContainer key={`week-${weekIndex}`} style={{ justifyContent: 'space-between', padding:0, flex:1 }}>
                            {week.map((date, dateIndex) => (
                                <PressableContainer 
                                    key={`date-${weekIndex}-${dateIndex}`} 
                                    style={{margin: 2, padding: 0, flex:1, backgroundColor: date.toDateString() === selectedDate.Date.toDateString() ? Colours.Primary : Colours.Secondary }} 
                                    onPress={() => {
                                        if(date.getMonth() !== monthStartDate.getMonth()) {
                                            setMonthIndex(date.getMonth() - today.getMonth());
                                        }
                                        setSelectedDate(date)
                                    }}
                                >
                                    <StyledText style={{ padding:0, margin:0, textAlign: 'center', fontSize: Fonts.sizes.large, color: date.getMonth() === monthStartDate.getMonth() ? Colours.Text : Colours.SecondaryText }}>
                                        {date.getDate()}
                                    </StyledText>
                                </PressableContainer>
                            ))}
                        </RowContainer>
                    ))}
                </ColumnContainer>
            </ColumnContainer>
        </>
    );
}