//2025-06-05 : Simple implementation for containers
import {Text} from "react-native";
import type { PropsWithChildren } from "react";
import type { TextStyle } from "react-native";

type StyledTextProps = {
    style?: TextStyle,
    ["aria-label"]?:string
}

const StyledText = ({style, children, 'aria-label' : ariaLabel} : PropsWithChildren<StyledTextProps>) => {
    return (
        <Text style={{ 
            ...styledTextStyles,
            ...style,

        }}
        aria-label={ariaLabel}>
            {children}
        </Text>
    );
}

const styledTextStyles = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    color: "#e3dccf",
    padding: 10,
    margin:0,
    textAlignVertical: "center",
    verticalAlign: "middle",
    fontSize: 12
} as TextStyle;


export default StyledText;