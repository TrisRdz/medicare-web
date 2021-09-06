import { useState } from 'react';
import Autocomplete from 'react-autocomplete';

import { symptoms } from '../../constants/symptoms';
import apiCall from '../../utils/api';

import '../../components/input/inputStyles.css';
import './homeStyles.css';


const removeEmpty = (selectedSymptoms) => {
  const validSymptoms = selectedSymptoms.filter((symptom) => symptom.value !== '');
  return validSymptoms;
}

const defaultSelectedSymptom = { value: '', isValid: false };

function HomePage() {
  const fetchPrediction = async () => {
    const validSymptoms = removeEmpty(selectedSymptoms);
    const formattedSymptoms = validSymptoms.map((validSymptom) => symptoms.find((symptom) => symptom.label === validSymptom.value).value);
    const response = await apiCall({
      method: 'POST',
      data: { percieved_symptoms: formattedSymptoms },
      url: 'check_disease'
    })
    setPrediction(response.data.result);
  }

  const [selectedSymptoms, setSelectedSymptoms] = useState(Array(5).fill(defaultSelectedSymptom));
  const [prediction, setPrediction] = useState('');
  const [error, setError] = useState('');

  const shouldItemRender = (item, value) => {
    if (selectedSymptoms.findIndex((symptom) => symptom.value === item.label) !== -1) {
      return false
    }
    const formattedItem = item.label.toLowerCase();
    return formattedItem.includes(value.toLowerCase())
  };

  const addNewSymptom = () => {
    setSelectedSymptoms([...selectedSymptoms, defaultSelectedSymptom ])
  }

  const onValueChanged = (value, index, isValid) => {
    setError('');
    setSelectedSymptoms(currentSelected => {
      const selectedCopy = [...currentSelected];
      selectedCopy[index] = { value, isValid };
      return selectedCopy;
    })
  }

  const checkIsInvalidInput = () => {
    const nonEmptySymptoms = removeEmpty(selectedSymptoms);
    const isAllEmpty = Boolean(!nonEmptySymptoms.length);
    const isAnyInvalid = isAllEmpty ? true : nonEmptySymptoms.some((symptom) => symptom.isValid === false);
    return isAllEmpty || isAnyInvalid;
  }

  const isInvalidInput = checkIsInvalidInput();

  console.log(selectedSymptoms);

  return (
    <div>
      <h1>Select Symptoms</h1>
      <h3>Select the symptoms you are facing so that we can issue a diagnosis</h3>
      <div style={{ marginBottom: 10 }}>
        {selectedSymptoms.map(({ value, isValid }, index) => (
          <div style={{ display: 'flex', alignItems: 'center' }} key={index}>
            <p style={{ marginRight: 10, width: 100 }}>Symptom {index + 1} :</p>
            <Autocomplete
              getItemValue={(item) => item.label}
              items={symptoms}
              renderItem={(item, isHighlighted) =>
                <div style={{ background: isHighlighted ? 'lightgray' : 'white' }} className='autoCompleteItem' key={item.label}>
                  {item.label}
                </div>
              }
              value={value}
              onChange={e => onValueChanged(e.target.value, index, false)}
              onSelect={(value) => onValueChanged(value, index, true)}
              shouldItemRender={shouldItemRender}
              wrapperStyle={{ display: 'block' }}
              menuStyle={{ 
                maxWidth: 207, 
                borderRadius: 5,
                boxShadow: '0 10px 12px rgba(0, 0, 0, 0.1)',
                background: 'rgba(255, 255, 255, 0.9)',
                fontSize: '90%',
                position: 'fixed',
                overflow: 'auto',
                maxHeight: '50%',
                marginTop: 5
              }}
              inputProps={{ placeholder: 'Select symptom', className: 'inputBox' }}
            />
            {Boolean(value.length) && !isValid && <span className='errorMessage' style={{ marginLeft: 15 }}>
              Please select a value from the dropdown menu  
            </span>}
          </div>
        ))}
      </div>
      {!!error && <p style={{ color: 'red' }}>
          {error}
        </p>}
      {selectedSymptoms.length < 10 && <button className='secondaryButton' style={{ marginBottom: 10 }} onClick={addNewSymptom}>
        ADD +
      </button>}
      <button onClick={fetchPrediction} className='primaryButton' disabled={isInvalidInput}>Submit</button>
      {!!prediction && <p>
        You might be having: <span style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>{prediction}</span>
      </p>}
    </div>
  );
}

export default HomePage;
