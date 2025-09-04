//2025-09-04 : Style changes, added bullet point to new description
//2025-09-02 : Added collapsible to description, moved blank name handling to container
//2025-08-26 : Added symptom description field back in
//2025-08-23 : Symptom form now contains only text input
//2025-06-05 : Symptom form now actually has some text input, tested
//2025-06-04 : Initial Commit with placeholder implementation
import React, {useEffect, useState} from 'react';
import { Pressable } from 'react-native';
import { RowContainer, EditableText, ColumnContainer, StyledText, StyledTextInput} from '../../../../CustomComponents/CustomComponents';
import type Symptom from '../../../../Types/Symptom';

export default function SymptomForm({ submitHandler, symptom, index }: { submitHandler: (newSymptom: Symptom, index: number) => void, symptom: Symptom, index: number }) {

    const [isEditing, setIsEditing] = useState<"Name" | "Description" | null>(null);
    const [editedSymptom, setEditedSymptom] = useState<Symptom>({ ...symptom });
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [symptomNameAutoFocus, setSymptomNameAutoFocus] = useState<boolean>(false);
    const rotateString = isExpanded ? "90deg" : "0deg";

    useEffect(() => {
            setEditedSymptom({ ...symptom });
    }, [symptom]);

    const handleFinishEditingName = (text: string) => {
        setIsEditing(null);
        submitHandler({...editedSymptom, Symptom_Name: text }, index);
    };
    const handleFinishEditingDescription = (text: string) => {
        setIsEditing(null);
        submitHandler({...editedSymptom, Symptom_Description: text }, index);
    };

    return (
        <ColumnContainer>
            <Pressable onPress={() => setIsExpanded(!isExpanded)} onLongPress={() => {
                setIsEditing("Name");
                setSymptomNameAutoFocus(true);
            }}>
                <RowContainer>
                    {editedSymptom.Symptom_Name !== "" ? 
                        <StyledText style={{fontSize:20, fontWeight:"bold", transform:[{rotate:rotateString}], paddingVertical:0}}>{"\u203A"}</StyledText> : 
                        null}
                    <EditableText
                        text={editedSymptom.Symptom_Name}
                        onFinishEditing={handleFinishEditingName}
                        containerStyle={{marginBottom: 10}}
                        aria-label={`Symptom Name ${index + 1}`}
                        placeholder='Enter Symptom Name...'
                        isEditing={isEditing === "Name"}
                        autoFocus={symptomNameAutoFocus}
                    />
                </RowContainer>
            </Pressable>
            {!isExpanded ? null 
            : (editedSymptom.Symptom_Description) ? (
            <Pressable onPress={() => setIsEditing("Description")}>
                <RowContainer>
                    <EditableText
                        text={editedSymptom.Symptom_Description}
                        onFinishEditing={handleFinishEditingDescription}
                        containerStyle={{marginBottom: 10}}
                        aria-label={`Symptom Description ${index + 1}`}
                        placeholder='Enter Symptom Description...'
                        isEditing={isEditing === "Description"}
                    />
                </RowContainer>
            </Pressable>
            ) : (
            <RowContainer>
                                <StyledText style={{
                                        fontSize: 15,
                                        paddingVertical: 0
                                    }}>{"\u2022"}</StyledText>
                <StyledTextInput
                    defaultValue={""}
                    onFinishEditing={handleFinishEditingDescription}
                    placeholder='Enter Symptom Description...'
                    aria-label={`Symptom Description ${index + 1} Input`}
                    style={{
                        flex: 1,
                        fontSize: 15,
                        padding: 5
                    }}
                />
            </RowContainer>
            )}
            
        </ColumnContainer>
    );
}