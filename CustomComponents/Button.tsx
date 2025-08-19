//2025-08-19 : Adding in a Button custom component
import {Pressable, Image} from "react-native";
import type { PropsWithChildren } from "react";
import type { ViewStyle, AccessibilityProps, ImageStyle, ImageComponent } from "react-native";
import React from "react";
import StyledText from "./StyledText"; // Assuming StyledText is defined in the same directory

type ButtonProps = PropsWithChildren<{
    style? : ViewStyle, 
    onPress?: () => void, 
    accessibilityRole?: AccessibilityProps["accessibilityRole"],
    ["aria-label"]?: string,
    labelText?: string,
    textStyle?: ViewStyle,
}>

const Button : React.FC<ButtonProps> = ({style, children, onPress, "aria-label" : ariaLabel, accessibilityRole, labelText, textStyle} : ButtonProps ) => {
    return (
        <Pressable 
            style={{ 
                ...pressableContainerStyles,
                ...style,
            }}
            onPress={onPress}
            accessibilityRole={accessibilityRole}
            aria-label={ariaLabel}
        >
            {
                children ?  children : // Render children if provided
                ( labelText && (// If labelText is provided, render the text
                <StyledText style={textStyle}>
                    {labelText}
                </StyledText>
            ))}
        </Pressable>
    );
}

const pressableContainerStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#272727",
    borderColor: "#111111",
    borderStyle: "solid",
    borderRadius: 5,
} as ViewStyle;


export default Button;