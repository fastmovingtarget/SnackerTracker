//2025-09-04 : Changes to submit logic due to new context
//2025-09-02 : Moved new symptom name form from SymptomForm
//2025-08-28 : Symptoms container now updates when selected date is changed
//2025-08-27 : Adding in a titled container for each section
//2025-08-23 : Container for the symptom input forms
import Symptom from '../../../Types/Symptom';
import React, { useEffect } from 'react';
import SymptomForm from './SymptomForm/SymptomForm';
import TitledContainer from '../../../CustomComponents/TitledContainer';
import { useTrackerArray } from '../../../Contexts/TrackerContext';
import { StyledTextInput, RowContainer } from '../../../CustomComponents/CustomComponents';

export default function SymptomsContainer() {
    const { selectedDate, handleSubmit } = useTrackerArray();

    const submitHandler = (newSymptom: Symptom, index: number) => {
        let updatedSymptoms = [...selectedDate?.Symptoms || []];
        updatedSymptoms[index] = newSymptom; // update the Symptom at the specified index

        updatedSymptoms = updatedSymptoms.filter(symptom => symptom.Symptom_Name !== ''); // Remove empty Symptoms

        handleSubmit({...selectedDate, Symptoms: updatedSymptoms});
    };

    const submitNewSymptomHandler = (newSymptomName: string) => {
        if (newSymptomName.trim() === '') return;

        const newSymptom: Symptom = {
            Symptom_Name: newSymptomName,
            Symptom_Description: '',
        };
        handleSubmit({...selectedDate, Symptoms: [...selectedDate?.Symptoms || [], newSymptom]});
    };

    return (
        <TitledContainer title="Symptoms">
            {selectedDate?.Symptoms.map((symptom, index) => (
                <SymptomForm key={index} symptom={symptom} index={index} submitHandler={submitHandler} />
            ))}
            <RowContainer>
                <StyledTextInput
                    style={{
                        flex: 1,
                        fontSize: 15,
                        padding: 5
                    }}
                    placeholder="Add a new symptom..."
                    onFinishEditing={submitNewSymptomHandler}
                    aria-label='New Symptom Name Input'
                />
            </RowContainer>
        </TitledContainer>
    );
}
