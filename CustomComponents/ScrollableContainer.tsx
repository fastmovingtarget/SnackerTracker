//2025-08-27 : Adding Colour theme export/import
//2025-06-04 : Simple implementation for containers
import {ScrollView} from "react-native";
import type { PropsWithChildren } from "react";
import type { ViewStyle } from "react-native";
import { Colours } from "../Constants/Colours";

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
    backgroundColor: Colours.Primary,
    color: Colours.Text,
    borderRadius: 10,
    padding: 10,
    margin: 5,
} as ViewStyle;

export default ScrollableContainer;