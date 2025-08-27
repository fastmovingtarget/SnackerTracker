//2025-08-27 : Adding Colour theme export/import
//2025-08-25 : Meal Form expands to show meal ingredients
//2025-08-23 : Added handling for finishing editing
//2025-06-05 : Simple implementation for containers
import {Text, TextInput, NativeSyntheticEvent, TextInputSubmitEditingEventData} from "react-native";
import type { PropsWithChildren } from "react";
import type { TextInputChangeEventData, TextStyle} from "react-native";
import {Colours} from "../Constants/Colours";
import { C } from "vitest/dist/chunks/reporters.6vxQttCV.js";

type InputTextProps = {
    style?: TextStyle,
    defaultValue? : string,
    placeholder?: string,
    inputMode?:'numeric' | 'text',
    onChange?:(event : NativeSyntheticEvent<TextInputChangeEventData>) => void,
    onChangeText?:(text : string) => void,
    onFinishEditing?: (event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void,
    ["aria-label"]:string
    multiline?: boolean,
    numberOfLines?: number,
    editable?: boolean,
    ref?: React.RefObject<TextInput | null>,
    autoFocus?: boolean
}

const StyledTextInput = ({style, children, defaultValue = "", inputMode = "text", onChange, onChangeText, onFinishEditing, 'aria-label' : ariaLabel, placeholder = "", multiline = false, numberOfLines = 1, editable = true, ref, autoFocus = false} : PropsWithChildren<InputTextProps>) => {

    return (
        <TextInput 
            style={{ 
                ...inputTextStyles,
                ...style,
            }}
            defaultValue={defaultValue}
            inputMode={inputMode}
            onChange={onChange}
            onChangeText={onChangeText}
            aria-label={ariaLabel}
            placeholder={placeholder}
            placeholderTextColor={Colours.SecondaryText}
            multiline={multiline}
            numberOfLines={numberOfLines}
            onBlur={onFinishEditing}
            editable={editable}
            ref={ref}
            autoFocus={autoFocus}
        >
            {children}
        </TextInput>
    );
}

const inputTextStyles = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: Colours.Secondary,
        color: Colours.SecondaryText,
        borderRadius: 5,
        textAlignVertical: "center",
        width: "70%",
        lineHeight: 20,
        fontSize: 16,
        margin: 5,
} as TextStyle;


export default StyledTextInput;