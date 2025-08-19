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
    onChangeText?: (newText: string) => void,
    onDelete?: () => void,
    onEdit?: () => void,
    onFinishEditing?: () => void,
    ["aria-label"]?:string
}

const EditableText = ({containerStyle, text, onChangeText, onDelete, onEdit, onFinishEditing, 'aria-label' : ariaLabel} : PropsWithChildren<EditableTextProps>) => {
    const [editing, setEditing] = useState(text === "");

    return (
        <RowContainer style={containerStyle}>
            {editing ? 
                <StyledTextInput
                    style={{flex: 1, textAlign: "center"}}
                    aria-label={`${ariaLabel || ""} Input`}
                    placeholder='Edit Text'
                    defaultValue={text}
                    onChangeText={(newText) => {
                        if (typeof onChangeText === "function") {
                            onChangeText(newText);
                        }
                    }}
                /> :
                <StyledText style={{flex: 1}} aria-label={ariaLabel}>
                    {text}
                </StyledText>
            }
            <RowContainer style={{ padding:0, margin:0, width:"auto"}}>
                {editing ? // If editing, show the Done button
                <Button labelText="Done" 
                        aria-label={`${ariaLabel} Done`} 
                        onPress={() => {
                                onFinishEditing && onFinishEditing();//if provided, call the onFinishEditing callback
                            setEditing(!editing)
                        }}
                /> : // If not editing, show the Edit and Delete buttons
                <>
                    <Button labelText="Edit" 
                            aria-label={`${ariaLabel} Edit`} 
                            onPress={() => {
                                if(!onEdit) return;
                                onEdit && onEdit();
                                setEditing(!editing)
                            }}
                    />
                    <Button labelText={"Delete"} aria-label={`${ariaLabel} Delete`} onPress={() =>  {
                        if (typeof onDelete === "function") 
                            onDelete()
                        }}
                    />
                </>
            }
            </RowContainer>
            
        </RowContainer>
    );
}

const rowContainerStyles = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    textAlignVertical: "center",
    textAlign: "center",
    color: "#e3dccf",
    borderRadius: 5,
    width: "100%",
    padding: 5,
} as ViewStyle;

export default EditableText;