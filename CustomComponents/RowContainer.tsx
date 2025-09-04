//2025-08-27 : Adding Colour theme export/import
//2025-06-04 : Simple implementation for containers
import {View} from "react-native";
import type { PropsWithChildren } from "react";
import type { ViewStyle } from "react-native";
import { Colours } from "../Constants/Colours";

type RowContainerProps = {
    style?: ViewStyle,
    ["aria-label"]?:string
}

const RowContainer = ({style, children, 'aria-label' : ariaLabel} : PropsWithChildren<RowContainerProps>) => {
    return (
        <View 
            style={{ 
                ...rowContainerStyles,
                ...style,
            }}
            aria-label={ariaLabel}>
            {children}
        </View>
    );
}

const rowContainerStyles = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    textAlignVertical: "center",
    textAlign: "center",
    color: Colours.Text,
    borderRadius: 5,
    width: "100%",
    padding: 5,
} as ViewStyle;

export default RowContainer;