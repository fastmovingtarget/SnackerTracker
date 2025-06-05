//2025-06-05 : Simple implementation for containers
import {Pressable} from "react-native";
import type { PropsWithChildren } from "react";
import type { ViewStyle, AccessibilityProps } from "react-native";

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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#272727",
    borderColor: "#111111",
    borderStyle: "solid",
    borderRadius: 5,
} as ViewStyle;


export default PressableContainer;