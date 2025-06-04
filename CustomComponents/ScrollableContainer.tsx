//2025-06-04 : Simple implementation for containers
import {ScrollView} from "react-native";
import type { PropsWithChildren } from "react";
import type { ViewStyle } from "react-native";

type ScrollableContainerProps = {
    style?: ViewStyle,
    ["aria-label"]?:string
}

const ScrollableContainer = ({style, children, 'aria-label' : ariaLabel} : PropsWithChildren<ScrollableContainerProps>) => {
    return (
        <ScrollView 
            contentContainerStyle={{ 
                ...scrollableContainerStyles,
                ...style,
            }}
            aria-label={ariaLabel}>
            {children}
        </ScrollView>
    );
}

const scrollableContainerStyles = {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#191f2b",
    color: "#e6e0d4",
    borderRadius: 10,
    padding: 10,
    margin: 5,
} as ViewStyle;

export default ScrollableContainer;