//2025-09-02 : Minor Style Changes
//2025-08-27 : Adding Colour theme export/import
//2025-06-05 : Simple implementation for containers
import {Pressable} from "react-native";
import type { PropsWithChildren } from "react";
import type { ViewStyle, AccessibilityProps } from "react-native";
import {Colours} from "../Constants/Colours";

type PressableContainerProps = PropsWithChildren<{
    style? : ViewStyle, 
    onPress?: () => void, 
    accessibilityRole?: AccessibilityProps["accessibilityRole"],
    ["aria-label"]?: string,
}>

const PressableContainer : React.FC<PressableContainerProps> = ({style, children, onPress, "aria-label" : ariaLabel, accessibilityRole} : PressableContainerProps ) => {
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
            {children}
        </Pressable>
    );
}

const pressableContainerStyles = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colours.Secondary,
    borderColor: Colours.Text,
    borderStyle: "solid",
    borderRadius: 5,
    borderWidth: 1,
} as ViewStyle;


export default PressableContainer;