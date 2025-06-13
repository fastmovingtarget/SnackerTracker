//2025-06-13 : Apply the styles to the container rather than the pressable
//2025-06-11 : Building a container for collapsible elements
import {Pressable, View} from "react-native";
import { useState } from "react";
import type { PropsWithChildren } from "react";
import type { ViewStyle, AccessibilityProps } from "react-native";
import {RowContainer, StyledText, ColumnContainer} from "./CustomComponents";

type CollapsibleContainerProps = PropsWithChildren<{
    style? : ViewStyle, 
    accessibilityRole?: AccessibilityProps["accessibilityRole"],
    collapsibleTitle : string,
    ["aria-label"]?: string,
    onPress?: () => void,
    isExpanded?: boolean,
}>

const CollapsibleContainer : React.FC<CollapsibleContainerProps> = ({style, children, "aria-label" : ariaLabel, accessibilityRole, collapsibleTitle, isExpanded = false, onPress = () => {}} : CollapsibleContainerProps ) => {

    const rotateString = isExpanded ? "90deg" : "0deg";

    return (
        <ColumnContainer 
                style={{ 
                    ...collapsibleContainerStyles,
                    ...style,
                }}>
            <Pressable 
                onPress={onPress}
                accessibilityRole={accessibilityRole}
                aria-label={ariaLabel}
            >
                <RowContainer style={{justifyContent: "flex-start"}}>
                    <StyledText style={{fontSize:32, transform:[{rotate:rotateString}]}}>{"\u203A"}</StyledText>
                    <StyledText style={{fontSize:20}}>{collapsibleTitle}</StyledText>
                </RowContainer>
            </Pressable>
            <View style={{
                display: isExpanded ? "flex" : "none",}}>
                {children}
            </View>
        </ColumnContainer>
    );
}

const collapsibleContainerStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
} as ViewStyle;


export default CollapsibleContainer;