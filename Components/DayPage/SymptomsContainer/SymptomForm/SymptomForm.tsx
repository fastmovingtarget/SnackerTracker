//2025-08-26 : Added symptom description field back in
//2025-08-23 : Symptom form now contains only text input
//2025-06-05 : Symptom form now actually has some text input, tested
//2025-06-04 : Initial Commit with placeholder implementation
import React from 'react';
import { RowContainer, EditableText, ColumnContainer} from '../../../../CustomComponents/CustomComponents';
import type Symptom from '../../../../Types/Symptom';

export default function SymptomForm({ submitHandler, symptom, index }: { submitHandler: (newSymptom: Symptom, index: number) => void, symptom: Symptom, index: number }) {

    const [editedSymptom, setEditedSymptom] = React.useState<Symptom>(symptom);

    const handleChangeText = (text: string) => {
        setEditedSymptom({ ...editedSymptom, Symptom_Name: text });
    };
    
    const handleFinishEditing = () => {
        submitHandler(editedSymptom, index);
    };

    return (
        <ColumnContainer>
            <EditableText
                text={symptom.Symptom_Name}
                onChangeText={(text) => handleChangeText(text)}
                onFinishEditing={handleFinishEditing}
                containerStyle={{marginBottom: 10}}
                aria-label={`Symptom Name Input ${index + 1}`}
                placeholder='Enter Symptom Name...'
            />
            <EditableText
                text={symptom?.Symptom_Description || ""}
                onChangeText={(text) => handleChangeText(text)}
                onFinishEditing={handleFinishEditing}
                containerStyle={{marginBottom: 10}}
                aria-label={`Symptom Description Input ${index + 1}`}
                placeholder='Enter Symptom Description...'
            />
        </ColumnContainer>
    );
}