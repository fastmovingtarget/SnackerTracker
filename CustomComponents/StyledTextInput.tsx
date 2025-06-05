//2025-06-05 : Simple implementation for containers
import {Text, TextInput, NativeSyntheticEvent, TextInputSubmitEditingEventData} from "react-native";
import type { PropsWithChildren } from "react";
import type { TextInputChangeEventData, TextStyle} from "react-native";

type InputTextProps = {
    style?: TextStyle,
    defaultValue? : string,
    placeholder?: string,
    inputMode?:'numeric' | 'text',
    onChange?:(event : NativeSyntheticEvent<TextInputChangeEventData>) => void,
    onChangeText?:(text : string) => void,
    ["aria-label"]:string
    multiline?: boolean,
    numberOfLines?: number,
}

const StyledTextInput = ({style, children, defaultValue = "", inputMode = "text", onChange, onChangeText, 'aria-label' : ariaLabel, placeholder = "", multiline = false, numberOfLines = 1} : PropsWithChildren<InputTextProps>) => {
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
            placeholderTextColor={"#e3dccf"}
            multiline={multiline}
            numberOfLines={numberOfLines}
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
        backgroundColor: "#111111",
        color: "#e3dccf",
        borderRadius: 5,
        textAlignVertical: "center",
        width: "70%",
        lineHeight: 20,
        fontSize: 16,
        margin: 5,
} as TextStyle;


export default StyledTextInput;