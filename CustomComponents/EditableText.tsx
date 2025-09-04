//2025-09-02 : Editable text now switches between text and text input again
//2025-08-23 : Editable text changed to be a glorified text input
//2025-08-19 : Wrapper and styles for Editable Text Component
import {Pressable, View} from "react-native";
import { useState, useEffect, type PropsWithChildren } from "react";
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
    onFinishEditing: (text :string) => void,
    ["aria-label"]?:string,
    isEditing: boolean,
    autoFocus?: boolean
}

const EditableText = ({text, placeholder, onFinishEditing, 'aria-label' : ariaLabel, isEditing = false, autoFocus = true} : PropsWithChildren<EditableTextProps>) => {
    return (
        <>
            {isEditing ? (
            <StyledTextInput
                    style={{
                        flex: 1,
                        fontSize: 15,
                        padding: 5,
                        margin: 0
                    }}
                aria-label={`${ariaLabel || ""} Input`}
                placeholder={placeholder}
                defaultValue={text}
                onFinishEditing={onFinishEditing}
                autoFocus={autoFocus}
            />
            ) : (
            <StyledText
                style={{flex: 1,
                    fontSize: 15,
                    padding:5,
                    margin: 0
                }}
                aria-label={`${ariaLabel || ""} Text`}
            >{text}</StyledText>)}
        </>
    );
}

export default EditableText;