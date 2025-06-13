//2025-06-13 : Splitting calendar into specific rows rather than overflowing a single row
//2025-06-05 : Implementing and testing a full calendar visual
//2025-06-04 : Initial Commit with placeholder implementation
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import StyledText from '../../CustomComponents/StyledText';
import ColumnContainer from '../../CustomComponents/ColumnContainer';
import RowContainer from '../../CustomComponents/RowContainer';
import PressableContainer from '../../CustomComponents/PressableContainer';

export default function Calendar({ setSelectedDate, isVisible }: { setSelectedDate: (date: Date) => void, isVisible: boolean }) {
    
    const [monthIndex, setMonthIndex] = useState(0); // 0 for current month, -1 for last month, 1 for next month

    const daysOfWeek = ["M", "Tu", "W", "Th", "F", "Sa", "Su"];

    const today = new Date();

    const monthStartDate = new Date(today.getFullYear(), today.getMonth() + monthIndex, 1);

    const monthArray : Date[][] = [[], [], [], [], [], []]; // 6 weeks, each will have 7 days added
   
    for (let i = 0; i < 42; i++){
        monthArray[Math.trunc(i/7)].push(new Date(monthStartDate.getFullYear(), monthStartDate.getMonth(), (2 + i) - (monthStartDate.getDay() || 7)));
    }


   /*  const daysArray = new Array(42).fill(null).map ((_, index) => {
        return new Date(today.getFullYear(), today.getMonth() + monthIndex, (2 + index) - (monthStartDate.getDay() || 7));
    })
 */
    return (
        <ColumnContainer style={{display: isVisible ? 'flex' : 'none', height: "50%", padding:0, margin:0, alignItems: 'center'}}>
            <RowContainer>
                <PressableContainer onPress={() => setMonthIndex(monthIndex - 1)} style={{ paddingHorizontal: 18, paddingBottom: 5, borderRadius:32}}>
                    <StyledText style={{ fontSize:30}}>
                        {'\u2039'}
                    </StyledText>
                </PressableContainer>
                    <StyledText style={{ flex: 1, fontSize:30, margin:0, padding:0, textAlign: 'center', borderRadius:0 }}>
                        {monthStartDate.toLocaleString('default', { month: 'short' })}
                    </StyledText>
                <PressableContainer onPress={() => setMonthIndex(monthIndex + 1)} style={{ paddingHorizontal: 18, paddingBottom: 5, borderRadius:32}}>
                    <StyledText style={{ fontSize:30,borderRadius:0 }}>
                        {'\u203A'}
                    </StyledText>
                </PressableContainer>
            </RowContainer>
            <RowContainer>
                {daysOfWeek.map((day, index) => (
                    <RowContainer key={`day-header-${index}`} style={{ flex: 1, justifyContent: 'center' }}>
                        <StyledText style={{ flex: 1, textAlign: 'center' }}>
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
                                style={{margin: 3, padding: 0, backgroundColor: '#000000', flex:1 }} 
                                onPress={() => setSelectedDate(date)}
                            >
                                <StyledText style={{ padding:0, margin:0, textAlign: 'center', color: date.getMonth() === monthStartDate.getMonth() ? 'white' : 'gray' }}>
                                    {date.getDate()}
                                </StyledText>
                            </PressableContainer>
                        ))}
                    </RowContainer>
                ))}
                {/* {daysArray.map((date, index) => (
                    <PressableContainer key={`date-${index}`} style={{width: '13%', height: "15%", margin:1, padding:1, backgroundColor: '#000000'}} onPress={() => setSelectedDate(date)}>
                        <StyledText style={{ textAlign: 'center' }}>
                            {date.getDate()}
                        </StyledText>
                    </PressableContainer>
                ))} */}
            </ColumnContainer>
        </ColumnContainer>
    );
}