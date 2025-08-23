//2025-08-23 : Editable text changed to be a glorified text input
//2025-08-19 : Wrapper and styles for Editable Text Component
import {Pressable, View} from "react-native";
import { useState, type PropsWithChildren } from "react";
import type { ViewStyle } from "react-native";
import RowContainer from "./RowContainer";
import PressableContainer from "./PressableContainer";
import StyledText from "./StyledText";
import StyledTextInput from "./StyledTextInput";
import Button from "./Button";

type EditableTextProps = {
    containerStyle?: ViewStyle,
    text:string,
    placeholder?: string,
    onChangeText: (newText: string) => void,
    onFinishEditing: () => void,
    ["aria-label"]?:string
}

const EditableText = ({containerStyle, text, placeholder, onChangeText, onFinishEditing, 'aria-label' : ariaLabel} : PropsWithChildren<EditableTextProps>) => {

    return (
        <RowContainer style={containerStyle}>
            <StyledTextInput
                style={{flex: 1, textAlign: "center"}}
                aria-label={`${ariaLabel || ""} Input`}
                placeholder={placeholder}
                defaultValue={text}
                onChangeText={(newText) => onChangeText(newText)}
                onFinishEditing={onFinishEditing}
            />          
        </RowContainer>
    );
}

export default EditableText;