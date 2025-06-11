//2025-06-11 : Removing flex value as a default
//2025-06-04 : Simple implementation for containers
import {View} from "react-native";
import type { PropsWithChildren } from "react";
import type { ViewStyle } from "react-native";

type ColumnContainerProps = {
    style?: ViewStyle,
    ["aria-label"]?:string
}

const ColumnContainer = ({style, children, 'aria-label' : ariaLabel} : PropsWithChildren<ColumnContainerProps>) => {
    return (
        <View 
            style={{ 
                ...columnContainerStyles,
                ...style,
            }}
            aria-label={ariaLabel}>
            {children}
        </View>
    );
}

const columnContainerStyles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#191f2b",
    color: "#e6e0d4",
    borderRadius: 10,
    padding: 10,
    margin: 5,
} as ViewStyle;


export default ColumnContainer;