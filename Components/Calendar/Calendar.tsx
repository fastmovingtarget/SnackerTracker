//2025-06-05 : Implementing and testing a full calendar visual
//2025-06-04 : Initial Commit with placeholder implementation
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import StyledText from '../../CustomComponents/StyledText';
import ColumnContainer from '../../CustomComponents/ColumnContainer';
import RowContainer from '../../CustomComponents/RowContainer';
import PressableContainer from '../../CustomComponents/PressableContainer';

export default function Calendar() {
    
    const [monthIndex, setMonthIndex] = useState(0); // 0 for current month, -1 for last month, 1 for next month

    const daysOfWeek = ["M", "Tu", "W", "Th", "F", "Sa", "Su"];

    const today = new Date();

    const monthStartDate = new Date(today.getFullYear(), today.getMonth() + monthIndex, 1);

    const daysArray = new Array(42).fill(null).map ((_, index) => {
        return new Date(today.getFullYear(), today.getMonth() + monthIndex, (2 + index) - (monthStartDate.getDay() || 7));
    })

    return (
        <ColumnContainer>
            <RowContainer>
                <PressableContainer onPress={() => setMonthIndex(monthIndex - 1)} style={{ paddingHorizontal: 10 }}>
                    <StyledText>
                        {'<'}
                    </StyledText>
                </PressableContainer>
                    <StyledText style={{ flex: 1, textAlign: 'center' }}>
                        {monthStartDate.toLocaleString('default', { month: 'short' })}
                    </StyledText>
                <PressableContainer onPress={() => setMonthIndex(monthIndex + 1)} style={{ paddingHorizontal: 10 }}>
                    <StyledText >
                        {'>'}
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
            <RowContainer style={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {daysArray.map((date, index) => (
                    <ColumnContainer key={`date-${index}`} style={{width: '10%', padding:2, backgroundColor: '#000000'}}>
                        <StyledText style={{ textAlign: 'center' }}>
                            {date.getDate()}
                        </StyledText>
                    </ColumnContainer>
                ))}
            </RowContainer>
        </ColumnContainer>
    );
}