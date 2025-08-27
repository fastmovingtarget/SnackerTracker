//2025-08-27 : Adding Colour theme export/import
//2025-06-11 : Removing flex value as a default
//2025-06-04 : Simple implementation for containers
import {View} from "react-native";
import type { PropsWithChildren } from "react";
import type { ViewStyle } from "react-native";
import { Colours } from "../Constants/Colours";

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
    backgroundColor: Colours.Primary,
    color: Colours.Text,
    borderRadius: 10,
    padding: 10,
    margin: 5,
} as ViewStyle;


export default ColumnContainer;