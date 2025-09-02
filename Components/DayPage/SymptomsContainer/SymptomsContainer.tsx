//2025-09-02 : Moved new symptom name form from SymptomForm
//2025-08-28 : Symptoms container now updates when selected date is changed
//2025-08-27 : Adding in a titled container for each section
//2025-08-23 : Container for the symptom input forms
import Symptom from '../../../Types/Symptom';
import React, { useEffect } from 'react';
import SymptomForm from './SymptomForm/SymptomForm';
import TitledContainer from '../../../CustomComponents/TitledContainer';
import { StyledTextInput, RowContainer } from '../../../CustomComponents/CustomComponents';

export default function SymptomsContainer({ symptoms, onSubmit }: { symptoms: Symptom[], onSubmit: (newSymptoms: (Symptom[])) => void }) {

    const [displaySymptoms, setDisplaySymptoms] = React.useState<Symptom[]>([...symptoms]); // Add an empty Symptom for new entries

    useEffect(() => {
        setDisplaySymptoms([...symptoms]);
    }, [symptoms]);

    const submitHandler = (newSymptom: Symptom, index: number) => {
        let updatedSymptoms = [...displaySymptoms];

        updatedSymptoms[index] = newSymptom; // update the Symptom at the specified index

        updatedSymptoms = updatedSymptoms.filter(symptom => symptom.Symptom_Name !== ''); // Remove empty Symptoms

        onSubmit(updatedSymptoms);

        setDisplaySymptoms([...updatedSymptoms]);
    };

    const submitNewSymptomHandler = (newSymptomName: string) => {
        if (newSymptomName.trim() === '') return;

        const newSymptom: Symptom = {
            Symptom_Name: newSymptomName,
            Symptom_Description: '',
        };
        onSubmit([...displaySymptoms, newSymptom]);
        setDisplaySymptoms([...displaySymptoms, newSymptom]);
    };

    return (
        <TitledContainer title="Symptoms">
            {displaySymptoms.map((symptom, index) => (
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
