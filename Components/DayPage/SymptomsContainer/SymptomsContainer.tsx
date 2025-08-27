//2025-08-27 : Adding in a titled container for each section
//2025-08-23 : Container for the symptom input forms
import Symptom from '../../../Types/Symptom';
import React from 'react';
import SymptomForm from './SymptomForm/SymptomForm';
import TitledContainer from '../../../CustomComponents/TitledContainer';

export default function SymptomsContainer({ symptoms, onSubmit }: { symptoms: Symptom[], onSubmit: (newSymptoms: (Symptom[])) => void }) {

    const [displaySymptoms, setDisplaySymptoms] = React.useState<Symptom[]>([...symptoms, {Symptom_Name: ''}]); // Add an empty Symptom for new entries

    const submitHandler = (newSymptom: Symptom, index: number) => {
        let updatedSymptoms = [...displaySymptoms];

        updatedSymptoms[index] = newSymptom; // update the Symptom at the specified index

        updatedSymptoms = updatedSymptoms.filter(symptom => symptom.Symptom_Name !== ''); // Remove empty Symptoms

        onSubmit(updatedSymptoms);

        setDisplaySymptoms([...updatedSymptoms, {Symptom_Name: ''}]); // Ensure there's always an empty Symptom at the end
    };

    return (
        <TitledContainer title="Symptoms">
            {displaySymptoms.map((symptom, index) => (
                <SymptomForm key={index} symptom={symptom} index={index} submitHandler={submitHandler} />
            ))}
        </TitledContainer>
    );
}
