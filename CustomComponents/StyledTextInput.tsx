//2025-09-02 : Handle changes to text within component
//2025-08-27 : Adding Colour theme export/import
//2025-08-25 : Meal Form expands to show meal ingredients
//2025-08-23 : Added handling for finishing editing
//2025-06-05 : Simple implementation for containers
import { useState, useRef } from "react";
import {TextInput, NativeSyntheticEvent, TextInputSubmitEditingEventData} from "react-native";
import type { PropsWithChildren } from "react";
import type { TextInputChangeEventData, TextStyle} from "react-native";
import {Colours} from "../Constants/Colours";

type InputTextProps = {
    style?: TextStyle,
    defaultValue? : string,
    placeholder?: string,
    inputMode?:'numeric' | 'text',
    onChange?:(event : NativeSyntheticEvent<TextInputChangeEventData>) => void,
    onChangeText?:(text : string) => void,
    onFinishEditing?: (text: string) => void,
    ["aria-label"]:string
    multiline?: boolean,
    numberOfLines?: number,
    editable?: boolean,
    autoFocus?: boolean
}

const StyledTextInput = ({style, children, defaultValue = "", inputMode = "text", onChange, onChangeText, onFinishEditing, 'aria-label' : ariaLabel, placeholder = "", multiline = false, numberOfLines = 1, editable = true, autoFocus = false} : PropsWithChildren<InputTextProps>) => {

    const [text, setText] = useState<string>(defaultValue);
    const ref = useRef<TextInput>(null);

    const handleChangeText = (text: string) => {
        setText(text);
        onChangeText && onChangeText(text);
    };

    const handleBlur = (event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        ref.current?.clear();
        setText("");
        onFinishEditing && onFinishEditing(text);
    };

    return (
        <TextInput 
            style={{ 
                ...inputTextStyles,
                ...style,
            }}
            defaultValue={defaultValue}
            inputMode={inputMode}
            onChange={onChange}
            onChangeText={handleChangeText}
            aria-label={ariaLabel}
            placeholder={placeholder}
            placeholderTextColor={Colours.SecondaryText}
            multiline={multiline}
            numberOfLines={numberOfLines}
            onBlur={handleBlur}
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
        flex: 1,
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